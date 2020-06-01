import { accumulateSaga, authSaga, callbackSaga, notificationSaga, redirectionSaga, refreshSaga, undo } from 'react-admin';
import { all } from 'redux-saga/effects';

import fetch from './fetch';
import fetchProgress from './fetchProgress';

/**
 * @param {Object} dataProvider A Data Provider function
 * @param {Object} authProvider A Auth Provider function
 * @param {Object} i18nProvider A i18n Provider function
 */
export default (dataProvider, authProvider) => function* adminSaga() {
    yield all([
        accumulateSaga(),
        authSaga(authProvider)(),
        callbackSaga(),
        fetch(dataProvider)(),
        fetchProgress(),
        notificationSaga(),
        redirectionSaga(),
        refreshSaga(),
        undo()
    ]);
};
