import { connectRouter, routerMiddleware } from 'connected-react-router';
import { adminReducer, CLEAR_STATE } from 'react-admin';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import sideEffects from './sideEffects';
import { themeReducer, THEME_TYPE } from './reducers';

const defaultPersistConfig = {
    key: 'persist-state-key',
    storage,
    blacklist: ['viewer', 'i18n', 'admin']
};

/**
 * @typedef {Object} AdminStore
 * @property {Object} store - the redux store, which created
 * @property {Persistor} persistor - the state's persistor built with redux-persist
 */

/**
 *
 * @param {Object} authProvider: auth provider for react admin
 * @param {Object} dataProvider: data provider for react admin
 * @param {Object} history: history for route middleware and react router
 * @param {Object} customReducer: combination of custom reducer using by app
 * @param {Object} customSideEffect: side effect handler of app
 * @param {Object} customMiddleware: add in custom middleware, ex: redux-thunk for viewer,...
 * @param {PersistConfig} persistConfig: config for redux-persist
 * @returns {AdminStore} The store configuration
 */
const createAdminStore = ({
    authProvider,
    dataProvider,
    history,
    customReducer = {},
    customSideEffect,
    customMiddlewares = [],
    persistConfig = defaultPersistConfig
}) => {
    const reducer = combineReducers({
        admin: adminReducer,
        router: connectRouter(history),
        [THEME_TYPE]: themeReducer,
        ...customReducer
    });
    // Erase data from the store but keep location, notifications, ui prefs, etc.
    // This allows e.g. to display a notification on logout
    const resettableAppReducer = (state, action) => reducer(
        action.type !== CLEAR_STATE
            ? state
            : {
                ...state,
                admin: {
                    ...state.admin,
                    loading: 0,
                    resources: {},
                    customQueries: {},
                    references: { oneToMany: {}, possibleValues: {} }
                }
            }, action
    );
    const persistableReducer = persistReducer(persistConfig, resettableAppReducer);

    const saga = function* rootSaga() {
        yield all(
            [
                sideEffects(dataProvider, authProvider),
                // add your own sagas here
                customSideEffect(dataProvider)
            ].map(fork)
        );
    };
    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(
        persistableReducer,
        // { /* set your initial state here */},
        {},
        compose(
            applyMiddleware(
                sagaMiddleware,
                // formMiddleware,
                routerMiddleware(history),
                // add your own middlewares here
                ...customMiddlewares
            ),
            /* eslint-disable no-underscore-dangle */
            typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__
                ? window.__REDUX_DEVTOOLS_EXTENSION__()
                : (f) => f
            // add your own enhancers here
        )
    );
    const persistor = persistStore(store);
    sagaMiddleware.run(saga);

    return { store, persistor };
};

export default createAdminStore;
