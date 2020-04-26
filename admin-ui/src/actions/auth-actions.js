import {
  AUTH_INPUT_CHANGE,
  AUTH_ERROR_CHANGE,
  AUTH_SHOW_LOADER,
  AUTH_HIDE_LOADER,
  AUTH_ALERT_MESSAGE,
  SET_USER_INFO
} from "./action-types";
import { axiosPost } from "../utils/axios";
import authService from "../utils/authService";
import { setUserAuthorizationMenus } from "./app-actions";
/**
 * Form Input Değişimlerinde Tetiklenir.
 * @param {string} key -- Gelen Input Keyi (bkz: "email"),
 * @param {string} value -- Gelen Input Value'su
 */
export function authInputChange(key, value) {
  return {
    type: AUTH_INPUT_CHANGE,
    key,
    value
  };
}

/**
 * Form Inputlarının Hatalı Olması Durumunda Tetiklenir.
 * @param {object} formErrors -- Gelen Hata Objesi
 */
export function authErrorChange(formErrors) {
  return {
    type: AUTH_ERROR_CHANGE,
    formErrors
  };
}

/**
 *  Form Loaderin Aktif Olmasını Tetikler.
 */
export function authShowLoader() {
  return {
    type: AUTH_SHOW_LOADER,
    formLoader: true
  };
}

/**
 *  Form Loaderin Pasif Olmasını Tetikler.
 */
export function authHideLoader() {
  return {
    type: AUTH_HIDE_LOADER,
    formLoader: false
  };
}

/**
 *  Kullanıcı bilgilerini reducer atar
 */
export function setUserInfo(payload, isUser = true) {
  return {
    type: SET_USER_INFO,
    payload,
    isUser
  };
}
/**
 * Alert Message Clear
 */
export function authAlertMessageClear() {
  return dispatch => {
    dispatch(authAlertMessage("", ""));
  };
}
/**
 *  API veya Form Üzerinde Hata Olması Durumunda veya Form Başarılı Gönderilmesi Durumunda Tetiklenir.
 *  @param {string} alertMessageType - Mesaj Tipi
 */
export function authAlertMessage(alertMessageType, alertMessageText = "") {
  return {
    type: AUTH_ALERT_MESSAGE,
    alertMessageType,
    alertMessageText
  };
}

/**
 * State'teki Bilgilere Göre Login Servisine API İsteğini Atar.
 */
export function authLogin(param = {}) {
  return (dispatch, getState) => {
    dispatch(authShowLoader());
    axiosPost("login", {
      ...getState().auth.formData,
      ...param
    }).then(res => {
      if (res.success) {
        const token = res.data.access_token;
        const userData = res.data;
        authService.signIn({
          info: userData,
          token
        }); // Gelen Response'u ve Token'i Localstorage'a Kaydeder.

        const menuData = res.data.role_json
          ? JSON.parse(res.data.role_json)
          : [];

        dispatch(setUserAuthorizationMenus(menuData));
        dispatch(setUserInfo(userData));
      } else {
        if (res.error.response && res.error.response.status === 404) {
          dispatch(authAlertMessage("form")); // Kullanıcı Adı veya Şifrede Bir Hata Meydana Geldi.
          dispatch(authHideLoader());
        } else {
          dispatch(authAlertMessage("api")); // API'de Bir Hata Meydana Geldi.
          dispatch(authHideLoader());
        }
      }
    });
  };
}

/**
 * Gelen Token'a Göre Menu İçin API İsteği Atar.
 */
export function authGetUser(token) {
  return dispatch => {
    axiosPost("user", {
      token
    }).then(res => {
      if (res.success) {
        const userData = res.data.info;
        authService.signIn({
          info: userData,
          token
        }); // Gelen Response'u ve Token'i Localstorage'a Kaydeder.

        const menuData =
          res.data.info && res.data.info.role_json
            ? JSON.parse(res.data.info.role_json)
            : [];

        dispatch(setUserAuthorizationMenus(menuData));
        dispatch(setUserInfo(userData));
      } else {
        dispatch(authLogout());
      }
    });
  };
}

/**
 * Çıkış Yapılırken, Loginden kalma dataları reducerdan temizler.
 */
export function authLogout() {
  return dispatch => {
    authService.signOut();
    dispatch(setUserAuthorizationMenus([]));
    dispatch(setUserInfo({}, false));
  };
}

/**
 * Gelen Token'a Göre Menu İçin API İsteği Atar.
 */
export function authInit() {
  return (dispatch, getState) => {
    // const { menu } = getState().app;
    //if (menu && menu.length <= 0) {
    if (authService.isExistsToken()) {
      const token = authService.getToken();
      const userInfo = authService.getInfo();
      if (token && userInfo) {
        dispatch(authGetUser(token));
      }
    } else {
      // window.location.href = "/";
    }
    // }
  };
}
