import { all } from 'redux-saga/effects';
import fetchProgress from './fetchProgress';

export default () => function* iTech() {
    yield all([
        fetchProgress()
    ]);
};
