import axios from "axios";
import USER_TYPE from "../_types/user_types";

export const loginThunkAction = (data) => {
  return (dispatch) => {
    // 로그인 요청
    axios
      .post("/api/login")
      .then((res) => {
        // 로그인 성공
      })
      .catch((err) => {
        // 로그인 실패
        console.error(err);
      });
  };
};

export const loginAction = (data) => {
  return {
    type: USER_TYPE.LOG_IN_REQUEST,
    data,
  };
};

export const logoutAction = () => {
  return {
    type: USER_TYPE.LOG_OUT_REQUEST,
  };
};
