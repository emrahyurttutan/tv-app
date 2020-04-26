import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";

import loaderMiddleware from "./middlewares/loaderMiddleware";
import promiseMiddleware from "./middlewares/promiseMiddleware";

import AppReducer from "./reducers";
let enhancer = {};
if (process.env.NODE_ENV !== "production") {
  const composeEnhancers =
    typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose;
  /**
   * composeEnhancers redux devtools kullanırken
   */
  enhancer = composeEnhancers(
    applyMiddleware(promiseMiddleware, thunk, loaderMiddleware)
  );
} else {
  enhancer = compose(
    applyMiddleware(promiseMiddleware, thunk, loaderMiddleware)
  );
}

export default createStore(AppReducer, {}, enhancer);
