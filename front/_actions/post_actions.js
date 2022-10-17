import POST_TYPE from "../_types/post_types";

export const addPostAction = (data) => {
  console.log("addPostAction", data);
  return {
    type: POST_TYPE.ADD_POST_SUCCESS,
    data,
  };
};

export const removePostAction = (postId) => {
  console.log("removePostAction", postId);
  return {
    type: POST_TYPE.REMOVE_POST_SUCCESS,
    data: {
      id: postId,
    },
  };
};

export const addCommentAction = (data) => {
  console.log("addCommentAction", data);
  return {
    type: POST_TYPE.ADD_COMMENT_SUCCESS,
    data,
  };
};
