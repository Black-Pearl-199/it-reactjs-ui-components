import { accumulateSaga, authSaga, callbackSaga, notificationSaga, redirectionSaga, refreshSaga, undo } from 'react-admin';
import { all } from 'redux-saga/effects';

import fetch from './fetch';

/**
 * @param {Object} dataProvider A Data Provider function
 * @param {Object} authProvider A Auth Provider function
 * @param {Object} i18nProvider A i18n Provider function
 */
export default (dataProvider, authProvider) => function* admin() {
    yield all([
        authSaga(authProvider)(),
        accumulateSaga(),
        callbackSaga(),
        fetch(dataProvider)(),
        notificationSaga(),
        redirectionSaga(),
        refreshSaga(),
        undo()
    ]);
};
