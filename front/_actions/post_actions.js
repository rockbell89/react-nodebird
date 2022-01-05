import POST_TYPE from "../_types/post_types";

export const addPostAction = (data) => {
  console.log(data);
  return {
    type: POST_TYPE.ADD_POST,
    data,
  };
};
