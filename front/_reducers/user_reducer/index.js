import USER_TYPE from "../../_types/user_types";

const initialState = {
  isLoggedIn: false,
  user: null,
  signUpData: {},
  loginData: {},
};

const dummyUser = {
  id: 1,
  nickname: "록벨",
  Posts: [],
  Followings: [],
  Followers: [],
};

// 이전상태 + 액션 => 다음 상태
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_TYPE.LOG_IN:
      return {
        ...state,
        isLoggedIn: true,
        user: dummyUser,
        loginData: action.data,
      };
    case USER_TYPE.LOG_OUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return { ...state };
  }
};

export default userReducer;
