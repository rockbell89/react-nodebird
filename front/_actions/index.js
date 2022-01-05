import USER_TYPE from "../_types/user_types";

export const loginAction = (data) => {
  console.log(data);
  return {
    type: USER_TYPE.LOG_IN,
    data,
  };
};

export const logoutAction = () => {
  return {
    type: USER_TYPE.LOG_OUT,
  };
};
