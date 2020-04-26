import {
  AUTH_INPUT_CHANGE,
  AUTH_ERROR_CHANGE,
  AUTH_SHOW_LOADER,
  AUTH_HIDE_LOADER,
  AUTH_ALERT_MESSAGE,
  SET_USER_AUTHORIZATION_MENUS,
  SET_USER_INFO
} from "../actions/action-types";

const initialState = {
  formLoader: false,
  //formData: { email: "emrah@yurttutan.net", password: "emrah" },
  formData: { email: "", password: "" },
  formErrors: {},
  alertMessageType: "",
  alertMessageText: ""
};

/**
 * Authentication İşlemlerinin Sağlandığı Reducer
 * @param {*} state
 * @param {*} action
 */
export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_INPUT_CHANGE:
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.key]: action.value
        }
      };
    case AUTH_ERROR_CHANGE:
      return {
        ...state,
        formErrors: action.formErrors
      };
    case AUTH_SHOW_LOADER:
      return {
        ...state,
        formLoader: action.formLoader
      };
    case AUTH_HIDE_LOADER:
      return {
        ...state,
        formLoader: action.formLoader
      };
    case AUTH_ALERT_MESSAGE:
      return {
        ...state,
        alertMessageType: action.alertMessageType
          ? action.alertMessageType
          : "",
        alertMessageText: action.alertMessageText ? action.alertMessageText : ""
      };
    case SET_USER_AUTHORIZATION_MENUS: {
      return {
        ...state,
        formData: {}
      };
    }

    case SET_USER_INFO:
      return {
        ...state,
        info: action.payload,
        isUser: action.isUser,
        formLoader: false,
        alertMessageType: "success"
      };
    default:
      return state;
  }
}
