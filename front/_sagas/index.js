import postSaga from "./post_sagas";
import userSaga from "./user_sagas";
import { all, fork } from "redux-saga/effects";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3065";

export default function* rootSaga() {
  console.log("saga 실행");
  yield all([fork(userSaga), fork(postSaga)]);
}

// take (1회 요청), takeEvery (반복 요청), takeLatest (마지막 요청) <=> takeLeading (처음 요청)
// throttle , debounce
// all([]) fork(비동기), call(동기)
