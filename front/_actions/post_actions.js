import POST_TYPE from "../_types/post_types";

export const addPostAction = (data) => {
  return {
    type: POST_TYPE.ADD_POST_REQUEST,
    data,
  };
};

export const removePostAction = (postId) => {
  return {
    type: POST_TYPE.REMOVE_POST_REQUEST,
    data: {
      PostId: postId,
    },
  };
};

export const addCommentAction = (data) => {
  console.log("addCommentAction", data);
  return {
    type: POST_TYPE.ADD_COMMENT_REQUEST,
    data,
  };
};
