import USER_TYPE from "../../_types/user_types";

const initialState = {
  isLoading: true,
  isLoggedIn: false,
  isError: null,
  isComplete: false,
  user: null,
  signUpData: {},
};

const dummyUser = (data) => ({
  ...data,
  id: 1,
  userId: "rockbell89",
  email: "rockbell89@gmail.com",
  nickname: "록벨",
  Posts: [
    // { id: 1 }
  ],
  Followings: [
    {
      id: 0,
    },
  ],
  Followers: [
    // {
    //   id: 2,
    //   userId: "bongbong89",
    //   email: "bongbong89@gmail.com",
    //   nickname: "봉봉",
    // },
  ],
});

// 이전상태 + 액션 => 다음 상태
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_TYPE.LOG_IN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case USER_TYPE.LOG_IN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        user: dummyUser(action.data),
      };
    case USER_TYPE.LOG_IN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        isError: action.error,
      };
    case USER_TYPE.LOG_OUT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case USER_TYPE.LOG_OUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
      };
    case USER_TYPE.LOG_OUT_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: action.error,
      };
    case USER_TYPE.SIGN_UP_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case USER_TYPE.SIGN_UP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        signUpData: action.data,
      };
    case USER_TYPE.SIGN_UP_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: action.error,
      };
    case USER_TYPE.ADD_POST_TO_ME:
      return {
        ...state,
        user: {
          ...state.user,
          Posts: [
            {
              id: action.data.id,
            },
            ...state.user.Posts,
          ],
        },
      };

    case USER_TYPE.REMOVE_POST_OF_ME:
      return {
        ...state,
        user: {
          ...state.user,
          Posts: state.user.Posts.filter((post) => post.id !== action.data.id),
        },
      };
    case USER_TYPE.UNFOLLOW_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case USER_TYPE.UNFOLLOW_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: {
          ...state.user,
          Followings: state.user.Followings.filter(
            (user) => user.id !== action.data.id
          ),
        },
      };
    case USER_TYPE.UNFOLLOW_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: action.error,
      };
    case USER_TYPE.FOLLOW_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case USER_TYPE.FOLLOW_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: {
          ...state.user,
          Followings: state.user.Followings.concat({ id: action.data.id }),
        },
      };
    case USER_TYPE.FOLLOW_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: action.error,
      };
    default:
      return state;
  }
};

export default userReducer;
