import { call, takeEvery } from 'redux-saga/effects';
import { FETCH_END, FETCH_ERROR, FETCH_START } from 'ra-core';
import { ProgressBarManager } from '../../components';

function* handleFetchProgress(action) {
    const { type } = action;
    try {
        switch (type) {
            case FETCH_START:
                yield call(ProgressBarManager.start, 'fetch');
                break;
            case FETCH_ERROR:
            case FETCH_END:
                yield call(ProgressBarManager.stop, 'fetch');
                break;
            default:
                break;
        }
    } catch (error) {
        console.error(error);
    }
}

const takeFetchAction = (action) => FETCH_START === action.type
    || FETCH_END === action.type
    || FETCH_ERROR === action.type;

export default function* () {
    yield takeEvery(takeFetchAction, handleFetchProgress);
}
