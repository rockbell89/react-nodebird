import USER_TYPE from "../_types/user_types";
import { all, call, fork, put, delay, takeLatest } from "redux-saga/effects";
import axios from "axios";

function loginAPI(data) {
  return axios.post("/user/login", data);
}

function* logIn(action) {
  try {
    // const result = yield call(loginAPI, action.data);
    yield delay(1000);
    yield put({
      type: USER_TYPE.LOG_IN_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: USER_TYPE.LOG_IN_FAILURE,
      error: err.response.data,
    });
  }
}

function logOutAPI(data) {
  return axios.post("/user/logout");
}

function* logOut(action) {
  try {
    // const result = yield call(logOutAPI, action.data);
    yield delay(1000);
    yield put({
      type: USER_TYPE.LOG_OUT_SUCCESS,
      // data: action.data,
    });
  } catch (err) {
    yield put({
      type: USER_TYPE.LOG_OUT_FAILURE,
      error: err.response.data,
    });
  }
}

function signUpAPI(data) {
  console.log("signUpAPI", data);
  return axios.post("/user", data);
}

function* signUp(action) {
  console.log("SIGN_UP_REQUEST", action);
  try {
    const result = yield call(signUpAPI, action.data);
    // yield delay(1000);
    console.log("result", result);
    yield put({
      type: USER_TYPE.SIGN_UP_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: USER_TYPE.SIGN_UP_FAILURE,
      error: err.response.data,
    });
  }
}

function* unFollow(action) {
  try {
    yield delay(1000);
    yield put({
      type: USER_TYPE.UNFOLLOW_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: USER_TYPE.UNFOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}

function* follow(action) {
  try {
    yield delay(1000);
    yield put({
      type: USER_TYPE.FOLLOW_SUCCESS,
      data: action.data,
    });
  } catch {
    yield put({
      type: USER_TYPE.FOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLogIn() {
  yield takeLatest(USER_TYPE.LOG_IN_REQUEST, logIn);
}
function* watchLogOut() {
  yield takeLatest(USER_TYPE.LOG_OUT_REQUEST, logOut);
}
function* watchSignUp() {
  yield takeLatest(USER_TYPE.SIGN_UP_REQUEST, signUp);
}

function* watchUnFollow() {
  yield takeLatest(USER_TYPE.UNFOLLOW_REQUEST, unFollow);
}

function* watchFollow() {
  yield takeLatest(USER_TYPE.FOLLOW_REQUEST, follow);
}

export default function* userSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
    fork(watchUnFollow),
    fork(watchFollow),
  ]);
}
