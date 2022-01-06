import { createWrapper } from "next-redux-wrapper";
import { applyMiddleware, compose, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "../_reducers/index";

/**
 * react + context API => redux / mobx
 * redux dev tools => npm i redux-devtools-extension
 * enhancer compose applyMiddleware
 * next 에서는 Provider 필요없음 (**next-redux-wrapper @6.x 이상)
 */
const configureStore = () => {
  const middleWares = [];
  const enhancer =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware(...middleWares))
      : composeWithDevTools(applyMiddleware(...middleWares));
  const store = createStore(reducer, enhancer);
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === "development",
});
export default wrapper;
