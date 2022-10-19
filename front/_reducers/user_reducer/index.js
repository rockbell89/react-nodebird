import USER_TYPE from "../../_types/user_types";

const initialState = {
  user: null,
  isLoggedIn: false,
  logInLoading: true,
  logInError: null,
  logInDone: false,
  logOutLoading: true,
  logOutError: false,
  logOutDone: false,
  signUpData: {},
  signUpLoading: true,
  signUpError: false,
  signUpDone: false,
  unfollowLoading: true,
  unfollowError: false,
  unfollowDone: false,
  followLoading: true,
  followError: false,
  followDone: false,
  loadMyInfoLoading: true,
  loadMyInfoError: false,
  loadMyInfoDone: false,
  changeNicknameLoading: false,
  changeNicknameDone: false,
  changeNicknameError: null,
};

// 이전상태 + 액션 => 다음 상태
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    // login
    case USER_TYPE.LOG_IN_REQUEST:
      return {
        ...state,
        logInLoading: true,
        logInDone: false,
        logInError: null,
      };
    case USER_TYPE.LOG_IN_SUCCESS:
      return {
        ...state,
        logInLoading: false,
        logInDone: true,
        isLoggedIn: true,
        user: action.data,
      };
    case USER_TYPE.LOG_IN_FAILURE:
      return {
        ...state,
        logInLoading: false,
        logInError: action.error,
      };
    // logout
    case USER_TYPE.LOG_OUT_REQUEST:
      return {
        ...state,
        logOutLoading: true,
        logOutDone: false,
        logOutError: null,
      };
    case USER_TYPE.LOG_OUT_SUCCESS:
      return {
        ...state,
        logOutLoading: false,
        logOutDone: true,
        isLoggedIn: false,
        user: null,
      };
    case USER_TYPE.LOG_OUT_FAILURE:
      return {
        ...state,
        logOutLoading: false,
        logOutError: action.error,
      };
    // signup
    case USER_TYPE.SIGN_UP_REQUEST:
      return {
        ...state,
        signUpLoading: true,
        signUpDone: false,
        signUpError: null,
      };
    case USER_TYPE.SIGN_UP_SUCCESS:
      return {
        ...state,
        signUpLoading: false,
        signUpDone: true,
        signUpData: action.data,
      };
    case USER_TYPE.SIGN_UP_FAILURE:
      return {
        ...state,
        signUpLoading: false,
        signUpError: action.error,
        signUpData: null,
      };
    // my post
    case USER_TYPE.ADD_POST_TO_ME:
      return {
        ...state,
        user: {
          ...state.user,
          Posts: [
            {
              id: action.data.PostId,
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
          Posts: state.user.Posts.filter(
            (post) => post.id !== action.data.PostId
          ),
        },
      };
    // my unfollow
    case USER_TYPE.UNFOLLOW_REQUEST:
      return {
        ...state,
        unfollowLoading: true,
        unfollowDone: false,
        unfollowError: action.error,
      };
    case USER_TYPE.UNFOLLOW_SUCCESS:
      return {
        ...state,
        unfollowLoading: false,
        unfollowDone: true,
        user: {
          ...state.user,
          Followings: state.user.Followings.filter(
            (user) => user.id !== action.data.UserId
          ),
        },
      };
    case USER_TYPE.UNFOLLOW_FAILURE:
      return {
        ...state,
        unfollowLoading: false,
        unfollowError: action.error,
      };
    // my follow
    case USER_TYPE.FOLLOW_REQUEST:
      return {
        ...state,
        followLoading: true,
        followDone: false,
        followError: null,
      };
    case USER_TYPE.FOLLOW_SUCCESS:
      return {
        ...state,
        followLoading: false,
        followDone: true,
        user: {
          ...state.user,
          Followings: state.user.Followings.concat({ id: action.data.UserId }),
        },
      };
    case USER_TYPE.FOLLOW_FAILURE:
      return {
        ...state,
        followLoading: false,
        followError: action.error,
      };
    // my info
    case USER_TYPE.LOAD_MY_INFO_REQUEST:
      return {
        ...state,
        loadMyInfoLoading: true,
        loadMyInfoDone: false,
        loadMyInfoError: null,
      };
    case USER_TYPE.LOAD_MY_INFO_SUCCESS:
      return {
        ...state,
        loadMyInfoLoading: false,
        loadMyInfoDone: true,
        user: action.data,
      };
    case USER_TYPE.LOAD_MY_INFO_FAILURE:
      return {
        ...state,
        loadMyInfoLoading: false,
        loadMyInfoError: action.error,
      };
    // CHANGE NICKNAME
    case USER_TYPE.CHANGE_NICKNAME_REQUEST:
      return {
        ...state,
        changeNicknameLoading: true,
        changeNicknameDone: false,
        changeNicknameError: null,
      };
    case USER_TYPE.CHANGE_NICKNAME_SUCCESS:
      return {
        ...state,
        changeNicknameLoading: false,
        changeNicknameDone: true,
        user: {
          ...state.user,
          nickname: action.data.nickname,
        },
      };
    case USER_TYPE.CHANGE_NICKNAME_FAILURE:
      return {
        ...state,
        changeNicknameLoading: false,
        changeNicknameError: action.error,
      };
    // default
    default:
      return state;
  }
};

export default userReducer;
