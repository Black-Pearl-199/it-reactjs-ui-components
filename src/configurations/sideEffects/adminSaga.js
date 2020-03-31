import { all } from 'redux-saga/effects';

import auth from 'ra-core/esm/sideEffect/auth';
import redirection from 'ra-core/esm/sideEffect/redirection';
import notification from 'ra-core/esm/sideEffect/notification';
import { undo } from 'ra-core';
import accumulate from 'ra-core/esm/sideEffect/accumulate';
import refresh from 'ra-core/esm/sideEffect/refresh';
import callback from 'ra-core/esm/sideEffect/callback';
import fetch from './fetch';

/**
 * @param {Object} dataProvider A Data Provider function
 * @param {Object} authProvider A Auth Provider function
 * @param {Object} i18nProvider A i18n Provider function
 */
export default (dataProvider, authProvider) => function* admin() {
    yield all([
        auth(authProvider)(),
        undo(),
        fetch(dataProvider)(),
        accumulate(),
        redirection(),
        refresh(),
        notification(),
        callback()
    ]);
};
