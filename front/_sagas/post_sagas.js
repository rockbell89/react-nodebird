import POST_TYPE from "../_types/post_types";
import USER_TYPE from "../_types/user_types";
import { all, call, fork, put, delay, takeLatest } from "redux-saga/effects";
import axios from "axios";
import shortId from "./index";
import { generateDummyPost } from "../_reducers/post_reducer";

function addPostAPI(data) {
  return axios.post(
    "/post",
    data
    // {
    //   withCredentials: true,
    // }
  );
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);
    // const id = shortId.generate();
    // yield delay(1000);
    yield put({
      type: POST_TYPE.ADD_POST_SUCCESS,
      data: result.data,
    });
    yield put({
      type: USER_TYPE.ADD_POST_TO_ME,
      data: {
        PostId: result.data.PostId,
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
  return axios.delete(`/post/${data.PostId}`);
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
  return axios.post(
    `/post/${data.PostId}/comment`,
    data
    // {
    //   withCredentials: true,
    // }
  );
}

function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.data);
    // yield delay(1000);
    yield put({
      type: POST_TYPE.ADD_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: POST_TYPE.ADD_COMMENT_FAILURE,
      error: err.response.data,
    });
  }
}

function loadPostAPI(data) {
  return axios.get(`/post`, data);
}

function* loadPosts(action) {
  try {
    const result = yield call(loadPostAPI, action.data);
    // const id = shortId.generate();
    // yield delay(1000);
    yield put({
      type: POST_TYPE.LOAD_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: POST_TYPE.LOAD_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function likePostAPI(data) {
  return axios.patch(`/post/${data.PostId}/like`);
}

function* likePost(action) {
  console.log(action.data);
  try {
    const result = yield call(likePostAPI, action.data);
    yield put({
      type: POST_TYPE.LIKE_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: POST_TYPE.LIKE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function unlikePostAPI(data) {
  return axios.delete(`/post/${data.PostId}/like`);
}

function* unlikePost(action) {
  try {
    const result = yield call(unlikePostAPI, action.data);
    yield put({
      type: POST_TYPE.UNLIKE_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: POST_TYPE.UNLIKE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function uploadImagesAPI(data) {
  console.log("uploadImagesAPI", data);
  return axios.post(`/post/images`, data);
}

function* uploadImages(action) {
  try {
    const result = yield call(uploadImagesAPI, action.data);
    console.log("uploadImages", action.data);
    yield put({
      type: POST_TYPE.UPLOAD_IMAGES_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: POST_TYPE.UPLOAD_IMAGES_FAILURE,
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

function* watchLikePost() {
  yield takeLatest(POST_TYPE.LIKE_POST_REQUEST, likePost);
}

function* watchUnlikePost() {
  yield takeLatest(POST_TYPE.UNLIKE_POST_REQUEST, unlikePost);
}

function* watchUploadImages() {
  yield takeLatest(POST_TYPE.UPLOAD_IMAGES_REQUEST, uploadImages);
}

export default function* postSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchRemovePost),
    fork(watchAddComment),
    fork(watchLoadPosts),
    fork(watchLikePost),
    fork(watchUnlikePost),
    fork(watchUploadImages),
  ]);
}
