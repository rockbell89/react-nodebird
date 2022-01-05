import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";
import userReducer from "./user_reducer/index";
import postReducer from "./post_reducer/index";

// 이전상태 + 액션 => 다음 상태
/**
 * combineReducers
 * reducer함수 합치기
 */
const rootReducer = combineReducers({
  index: (state = {}, action) => {
    switch (action.type) {
      case HYDRATE:
        return { ...state, ...action.payload };
      default:
        return { ...state };
    }
  },
  user: userReducer,
  post: postReducer,
});

export default rootReducer;
