import {watchLatestSaga} from './latestSaga';
import {watchDetailSaga} from './detailsSaga';
import {all} from 'redux-saga/effects';

/*
This component houses the root sagas which assimilates the rest of the sagas for use
*/

function* rootSaga() {
  yield all([watchLatestSaga(), watchDetailSaga()]);
}

export default rootSaga;
