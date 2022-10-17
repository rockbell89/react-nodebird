import POST_TYPE from "../_types/post_types";
import USER_TYPE from "../_types/user_types";
import { all, call, fork, put, delay, takeLatest } from "redux-saga/effects";
import axios from "axios";
import shortId from "./index";
import { generateDummyPost } from "../_reducers/post_reducer";

function addPostAPI(data) {
  return axios.post("/addPost");
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);
    const id = shortId.generate();
    // yield delay(1000);
    yield put({
      type: POST_TYPE.ADD_POST_SUCCESS,
      data: {
        id,
        content: action.data,
      },
    });
    yield put({
      type: USER_TYPE.ADD_POST_TO_ME,
      data: {
        id,
      },
    });
  } catch (err) {
    yield put({
      type: POST_TYPE.ADD_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function removePostAPI(data) {
  return axios.delete(`/${id}`);
}

function* removePost(action) {
  try {
    const result = yield call(removePostAPI, action.data);
    // yield delay(1000);
    yield put({
      type: POST_TYPE.REMOVE_POST_SUCCESS,
      data: action.data,
    });
    yield put({
      type: USER_TYPE.REMOVE_POST_OF_ME,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: POST_TYPE.REMOVE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function addCommentAPI(data) {
  return axios.post(`/post/${postId}/addComment`);
}

function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.data);
    // yield delay(1000);
    yield put({
      type: POST_TYPE.ADD_COMMENT_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: POST_TYPE.ADD_COMMENT_FAILURE,
      error: err.response.data,
    });
  }
}

function* loadPosts(action) {
  try {
    // const id = shortId.generate();
    yield delay(1000);
    yield put({
      type: POST_TYPE.LOAD_POST_SUCCESS,
      data: generateDummyPost(10),
    });
  } catch (err) {
    yield put({
      type: POST_TYPE.LOAD_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchAddPost() {
  yield takeLatest(POST_TYPE.ADD_POST_REQUEST, addPost);
}

function* watchRemovePost() {
  yield takeLatest(POST_TYPE.REMOVE_POST_REQUEST, removePost);
}

function* watchAddComment() {
  yield takeLatest(POST_TYPE.ADD_COMMENT_REQUEST, addComment);
}

function* watchLoadPosts() {
  yield takeLatest(POST_TYPE.LOAD_POST_REQUEST, loadPosts);
}

export default function* postSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchRemovePost),
    fork(watchAddComment),
    fork(watchLoadPosts),
  ]);
}
