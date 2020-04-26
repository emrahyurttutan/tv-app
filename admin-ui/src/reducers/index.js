import { combineReducers } from "redux";
import appReducer from "./app-reducer";
import authReducer from "./auth-reducer";
import pageReducer from "./page-reducer";
export default combineReducers({
  app: appReducer,
  page: pageReducer,
  auth: authReducer
});
