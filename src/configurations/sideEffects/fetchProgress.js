import { FETCH_END, FETCH_ERROR, FETCH_START } from 'ra-core';
import { call, takeEvery } from 'redux-saga/effects';
import { ProgressBarManager } from '../../components/progressBar';

function* handleFetchProgress(action) {
    const { type } = action;
    switch (type) {
        case FETCH_START:
            yield call(ProgressBarManager.getInstance().start, 'fetch');
            break;
        case FETCH_ERROR:
        case FETCH_END:
            yield call(ProgressBarManager.getInstance().stop, 'fetch');
            break;
        default:
            break;
    }
}

const takeFetchAction = (action) => FETCH_START === action.type
    || FETCH_END === action.type
    || FETCH_ERROR === action.type;

export default function* () {
    yield takeEvery(takeFetchAction, handleFetchProgress);
}
