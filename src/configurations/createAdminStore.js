import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import {
    adminReducer,
    // defaultI18nProvider,
    // i18nReducer,
    // formMiddleware,
    USER_LOGOUT
} from 'react-admin';
// import iTechSideEffect from './sideEffects';

import adminSaga from './sideEffects/adminSaga';

export const createAdminStore = ({
    authProvider,
    dataProvider,
    customReducer,
    // i18nProvider = defaultI18nProvider,
    history,
    customSideEffect
    // locale = "en"
}) => {
    console.log('customReducer', customReducer);
    const reducer = combineReducers({
        admin: adminReducer,
        // i18n: i18nReducer(locale, i18nProvider(locale)),
        router: connectRouter(history),
        ...customReducer
    });
    const resettableAppReducer = (state, action) => reducer(action.type !== USER_LOGOUT ? state : undefined, action);

    const saga = function* rootSaga() {
        yield all(
            [
                adminSaga(dataProvider, authProvider),
                // add your own sagas here
                // iTechSideEffect(dataProvider),
                customSideEffect(dataProvider)
                // fetchProgress()
            ].map(fork)
        );
    };
    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(
        resettableAppReducer,
        // {
        //     /* set your initial state here */
        // },
        compose(
            applyMiddleware(
                sagaMiddleware,
                // formMiddleware,
                routerMiddleware(history)
                // LogRocket.reduxMiddleware()
                // add your own middlewares here
            ),
            typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__
                ? window.__REDUX_DEVTOOLS_EXTENSION__()
                : (f) => f
            // add your own enhancers here
        )
    );
    sagaMiddleware.run(saga);
    return store;
};
