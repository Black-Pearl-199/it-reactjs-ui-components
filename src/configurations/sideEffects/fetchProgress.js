import { FETCH_CANCEL, FETCH_END, FETCH_ERROR, FETCH_START } from 'react-admin';
import { call, takeEvery } from 'redux-saga/effects';
import { ProgressBarManager } from '../../components/progressBar';

function* handleFetchProgress(action) {
    const { type } = action;
    switch (type) {
        case FETCH_START:
            yield call(ProgressBarManager.getInstance().start, 'fetch');
            break;
        case FETCH_CANCEL:
        case FETCH_ERROR:
        case FETCH_END:
            yield call(ProgressBarManager.getInstance().stop, 'fetch');
            break;
        default:
            break;
    }
}

export default function* () {
    yield takeEvery([FETCH_CANCEL, FETCH_END, FETCH_ERROR, FETCH_START], handleFetchProgress);
}
