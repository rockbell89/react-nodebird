import { all, call, fork, take, put, delay } from "redux-saga/effects";
import axios from "axios";

function loginAPI(data) {
  return axios.post("/api/login", data);
}

function* logIn(action) {
  try {
    // const result = yield call(loginAPI, action.data);
    yield delay(1000);
    yield put({
      type: "LOGIN_SUCCESS",
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: "LOGIN_FAILURE",
      data: err.response.data,
    });
  }
}
// take, takeEvery, takeLatest <=> takeLeading
// throttle
function* watchLogin() {
  yield takeLatest("LOG_IN", logIn());
}
function* watchLogout() {
  yield takeLatest("LOG_OUT");
}
function* watchAddPost() {
  yield takeLatest("ADD_POST");
}

// all([]) fork(비동기), call(동기)
export default function* rootSaga() {
  yield all([fork(watchLogin), fork(watchLogout), fork(watchAddPost)]);
}
