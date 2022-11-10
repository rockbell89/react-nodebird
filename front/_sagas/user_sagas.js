import USER_TYPE from "../_types/user_types";
import { all, call, fork, put, delay, takeLatest } from "redux-saga/effects";
import axios from "axios";
import POST_TYPE from "../_types/post_types";

function logInAPI(data) {
  return axios.post("/user/login", data);
}

function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data);
    // yield delay(1000);
    yield put({
      type: USER_TYPE.LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: USER_TYPE.LOG_IN_FAILURE,
      error: err.response.data,
    });
  }
}

function logOutAPI(data) {
  return axios.post("/user/logout", data);
}

function* logOut(action) {
  try {
    const result = yield call(logOutAPI, action.data);
    // yield delay(1000);
    yield put({
      type: USER_TYPE.LOG_OUT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: USER_TYPE.LOG_OUT_FAILURE,
      error: err.response.data,
    });
  }
}

function signUpAPI(data) {
  return axios.post("/user", data);
}

function* signUp(action) {
  try {
    const result = yield call(signUpAPI, action.data);
    // yield delay(1000);
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

function unfollowAPI(data) {
  return axios.delete(`/user/${data.UserId}/follow`);
}

function* unFollow(action) {
  try {
    const result = yield call(unfollowAPI, action.data);
    yield put({
      type: USER_TYPE.UNFOLLOW_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: USER_TYPE.UNFOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}

function followAPI(data) {
  return axios.patch(`/user/${data.UserId}/follow`);
}

function* follow(action) {
  try {
    const result = yield call(followAPI, action.data);
    yield put({
      type: USER_TYPE.FOLLOW_SUCCESS,
      data: result.data,
    });
  } catch {
    yield put({
      type: USER_TYPE.FOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}

function loadMyinfoAPI() {
  return axios.get("/user");
}

function* loadMyinfo(action) {
  try {
    const result = yield call(loadMyinfoAPI, action.data);
    yield put({
      type: USER_TYPE.LOAD_MY_INFO_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: USER_TYPE.LOAD_MY_INFO_FAILURE,
      error: err.response.data,
    });
  }
}

function changeNicknameAPI(data) {
  return axios.patch(`/user/nickname`, data);
}

function* changeNickname(action) {
  try {
    const result = yield call(changeNicknameAPI, action.data);
    yield put({
      type: USER_TYPE.CHANGE_NICKNAME_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: USER_TYPE.CHANGE_NICKNAME_FAILURE,
      error: err.response.data,
    });
  }
}

function loadFollowersAPI(data) {
  return axios.get("/user/followers", data);
}

function* loadFollowers(action) {
  try {
    const result = yield call(loadFollowersAPI, action.data);
    yield put({
      type: USER_TYPE.LOAD_FOLLOWERS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: USER_TYPE.LOAD_FOLLOWERS_FAILURE,
      error: err.response.data,
    });
  }
}

function loadFollowingsAPI(data) {
  return axios.get("/user/followings", data);
}

function* loadFollowings(action) {
  try {
    const result = yield call(loadFollowingsAPI, action.data);
    yield put({
      type: USER_TYPE.LOAD_FOLLOWINGS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: USER_TYPE.LOAD_FOLLOWINGS_FAILURE,
      error: err.response.data,
    });
  }
}

function removeFollowerAPI(data) {
  return axios.delete(`/user/follower/${data.UserId}`);
}

function* removeFollower(action) {
  try {
    const result = yield call(removeFollowerAPI, action.data);
    yield put({
      type: USER_TYPE.REMOVE_FOLLOWER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: USER_TYPE.REMOVE_FOLLOWER_FAILURE,
      error: err.response.data,
    });
  }
}

function loadUserInfoAPI(data) {
  console.log(data);
  return axios.get(`/user/${data.UserId}`);
}

function* loadUserInfo(action) {
  try {
    const result = yield call(loadUserInfoAPI, action.data);
    console.log(action);
    yield put({
      type: USER_TYPE.LOAD_USER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: USER_TYPE.LOAD_USER_FAILURE,
      error: err.response.data,
    });
  }
}

//
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

function* watchLoadMyInfo() {
  yield takeLatest(USER_TYPE.LOAD_MY_INFO_REQUEST, loadMyinfo);
}

function* watchChangeNickname() {
  yield takeLatest(USER_TYPE.CHANGE_NICKNAME_REQUEST, changeNickname);
}

function* watchLoadFollowers() {
  yield takeLatest(USER_TYPE.LOAD_FOLLOWERS_REQUEST, loadFollowers);
}

function* watchLoadFollowings() {
  yield takeLatest(USER_TYPE.LOAD_FOLLOWINGS_REQUEST, loadFollowings);
}

function* watchRemoveFollower() {
  yield takeLatest(USER_TYPE.REMOVE_FOLLOWER_REQUEST, removeFollower);
}

function* watchLoadUser() {
  yield takeLatest(USER_TYPE.LOAD_USER_REQUEST, loadUserInfo);
}

export default function* userSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
    fork(watchUnFollow),
    fork(watchFollow),
    fork(watchLoadMyInfo),
    fork(watchChangeNickname),
    fork(watchLoadFollowers),
    fork(watchLoadFollowings),
    fork(watchRemoveFollower),
    fork(watchLoadUser),
  ]);
}
