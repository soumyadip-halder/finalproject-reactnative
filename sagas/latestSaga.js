import {
  fetchLatest,
  fetchLatestSuccess,
  fetchLatestError,
} from '../redux/latest/actions';
import {call, put, takeEvery} from 'redux-saga/effects';
import fetchLatestApi from '../api/fetchLatest';

/*
This component houses the sagas needed for asynchronous fetch of data from api for getting latest movie lists
*/

function* workLatestSaga() {
  try {
    const data1 = yield call(fetchLatestApi);
    yield put(fetchLatestSuccess(data1));
  } catch (error) {
    yield put(fetchLatestError(error.message));
  }
}

export function* watchLatestSaga() {
  yield takeEvery(fetchLatest().type, workLatestSaga);
}
