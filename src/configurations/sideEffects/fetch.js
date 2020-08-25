import {
    CREATE,
    DELETE,
    DELETE_MANY,
    FETCH_CANCEL,
    FETCH_END,
    FETCH_ERROR,
    FETCH_START,
    fetchActionsWithArrayOfIdentifiedRecordsResponse,
    fetchActionsWithArrayOfRecordsResponse,
    fetchActionsWithRecordResponse,
    fetchActionsWithTotalResponse,
    GET_LIST,
    GET_MANY,
    GET_MANY_REFERENCE,
    GET_ONE,
    UPDATE,
    UPDATE_MANY
} from 'react-admin';
import { all, call, cancelled, put, select, takeEvery } from 'redux-saga/effects';

// import { checkTokenExpire, refreshToken } from '../resources/authProvider';

const sanitizeFetchType = (fetchType) => {
    switch (fetchType) {
        case GET_LIST:
            return 'getList';
        case GET_ONE:
            return 'getOne';
        case GET_MANY:
            return 'getMany';
        case GET_MANY_REFERENCE:
            return 'getManyReference';
        case CREATE:
            return 'create';
        case UPDATE:
            return 'update';
        case UPDATE_MANY:
            return 'updateMany';
        case DELETE:
            return 'delete';
        case DELETE_MANY:
            return 'deleteMany';
        default:
            return fetchType;
    }
};

function validateResponseFormat(
    response,
    type,
    logger = console.error // eslint-disable-line no-console
) {
    if (!Object.hasOwnProperty.call(response, 'data')) {
        logger(
            `The response to '${type}' must be like { data: ... }, but the received response does not have a 'data' key. The dataProvider is probably wrong for '${type}'.`
        );
        throw new Error('ra.notification.data_provider_error');
    }
    if (fetchActionsWithArrayOfRecordsResponse.includes(type) && !Array.isArray(response.data)) {
        logger(
            `The response to '${type}' must be like { data : [...] }, but the received data is not an array. The dataProvider is probably wrong for '${type}'`
        );
        throw new Error('ra.notification.data_provider_error');
    }
    if (
        fetchActionsWithArrayOfIdentifiedRecordsResponse.includes(type)
        && Array.isArray(response.data)
        && response.data.length > 0
        && response.data.some((d) => !Object.hasOwnProperty.call(d, 'id'))
    ) {
        logger(
            `The response to '${type}' must be like { data : [{ id: 123, ...}, ...] }, but at least one received data item do not have an 'id' key. The dataProvider is probably wrong for '${type}'`
        );
        throw new Error('ra.notification.data_provider_error');
    }
    if (fetchActionsWithRecordResponse.includes(type) && !Object.hasOwnProperty.call(response.data, 'id')) {
        logger(
            `The response to '${type}' must be like { data: { id: 123, ... } }, but the received data does not have an 'id' key. The dataProvider is probably wrong for '${type}'`
        );
        throw new Error('ra.notification.data_provider_error');
    }
    if (fetchActionsWithTotalResponse.includes(type) && !Object.hasOwnProperty.call(response, 'total')) {
        logger(
            `The response to '${type}' must be like  { data: [...], total: 123 }, but the received response does not have a 'total' key. The dataProvider is probably wrong for '${type}'`
        );
        throw new Error('ra.notification.data_provider_error');
    }
}

export function* handleFetch(dataProvider, action) {
    const {
        type,
        payload,
        meta: { fetch: fetchMeta, onSuccess, onFailure, ...meta }
    } = action;
    const restType = fetchMeta;
    const successSideEffects = onSuccess instanceof Function ? {} : onSuccess;
    const failureSideEffects = onFailure instanceof Function ? {} : onFailure;

    try {
        const isOptimistic = yield select((state) => state.admin.ui.optimistic);
        if (isOptimistic) {
            // in optimistic mode, all fetch actions are canceled,
            // so the admin uses the store without synchronization
            return;
        }

        yield all([put({ type: `${type}_LOADING`, payload, meta }), put({ type: FETCH_START })]);
        const response = yield call(dataProvider[sanitizeFetchType(restType)], meta.resource, payload);
        if (process.env.NODE_ENV !== 'production') {
            validateResponseFormat(response, restType);
        }
        yield put({
            type: `${type}_SUCCESS`,
            payload: response,
            requestPayload: payload,
            meta: {
                ...meta,
                ...successSideEffects,
                fetchResponse: restType,
                fetchStatus: FETCH_END
            }
        });
        yield put({ type: FETCH_END });
    } catch (error) {
        yield put({
            type: `${type}_FAILURE`,
            error: error.message ? error.message : error,
            payload: error.body ? error.body : null,
            requestPayload: payload,
            meta: {
                ...meta,
                ...failureSideEffects,
                fetchResponse: restType,
                fetchStatus: FETCH_ERROR
            }
        });
        yield put({ type: FETCH_ERROR, error });
    } finally {
        if (yield cancelled()) {
            yield put({ type: FETCH_CANCEL });
            // return;
        }
    }
}

export const takeFetchAction = (action) => action.meta && action.meta.fetch;

const fetch = (dataProvider) => function* watchFetch() {
    yield takeEvery(takeFetchAction, handleFetch, dataProvider);
};

export default fetch;
