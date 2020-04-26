import {
  SET_USER_AUTHORIZATION_MENUS,
  SHOW_USER_PROFILE,
  HIDE_USER_PROFILE,
  MENU_ITEM_CLICK,
  MENU_ACTIVE_ITEM_CHANGE,
  TOGGLE_MENU,
  SET_CHANNEL_LIST,
  SET_DAY_LIST,
  SET_CATEGORY_LIST
} from "./action-types";
import { authGetMenu } from "../selectors/app-selectors";
import { axiosPost } from "../utils/axios";

/**
 * Kullanıcı yetkisine göre erişebileceği menülerini listesini döner.
 * Liste üzerinden menus.json dosyasına göre listemesi yapılacak
 * @param {string} payload -- Gelen Yetki datası
 */
export const setUserAuthorizationMenus = payload => {
  return {
    type: SET_USER_AUTHORIZATION_MENUS,
    authmenu: payload,
    payload: authGetMenu(payload)
  };
};

/**
 * header alanındaki kullanıcı profilini durumunu true yapar.
 */
export const showUserProfile = () => {
  return {
    type: SHOW_USER_PROFILE
  };
};

/**
 * header alanındaki kullanıcı profilini durumunu false yapar.
 */
export const hideUserProfile = () => {
  return {
    type: HIDE_USER_PROFILE
  };
};

/**
 * menu item click
 */
export const menuItemClick = () => {
  return {
    type: MENU_ITEM_CLICK
  };
};

/**
 * sol daki menunun childrenlarını activeItem atayan action
 * @param {number} activeItem
 */

export const menuActiveItemChange = activeItem => {
  return {
    type: MENU_ACTIVE_ITEM_CHANGE,
    activeItem
  };
};

export const toggleMenu = () => {
  return {
    type: TOGGLE_MENU
  };
};

/**
 * Uygulama içerisinde kullanılacak olan kanal listesini getiren action
 *
 * @param {string} loaderGroup
 */
export const getChannels = (loaderGroup = "homepage") => {
  return dispatch => {
    dispatch({
      type: SET_CHANNEL_LIST,
      meta: { loaderGroup },
      payload: axiosPost("channels", {}).then(res => res.data)
    });
  };
};
/**
 * Uygulama içerisinde kullanılacak olan kategorileri listesini getiren action
 *
 * @param {string} loaderGroup
 */
export const getCategories = (loaderGroup = "homepage") => {
  return dispatch => {
    dispatch({
      type: SET_CATEGORY_LIST,
      meta: { loaderGroup },
      payload: axiosPost("categories", {}).then(res => res.data)
    });
  };
};

/**
 * Uygulama içerisinde kullanılacak olan kategorileri listesini getiren action
 *
 * @param {string} loaderGroup
 */
export const getCategoriesOptions = (loaderGroup = "category") => {
  return dispatch => {
    dispatch({
      type: SET_CATEGORY_LIST,
      meta: { loaderGroup },
      payload: axiosPost("categories", {}).then(res => {
        let results = [];

        if (res.success && res.data && res.data.length > 0) {
          res.data.forEach(data => {
            results.push({
              label: data.name,
              value: data.id
            });
          });
        }
        return results;
      })
    });
  };
};

/**
 * günler listesi
 * @param {*} loaderGroup
 */
export const getDayList = (loaderGroup = "homepage") => {
  return dispatch => {
    dispatch({
      type: SET_DAY_LIST,
      meta: { loaderGroup },
      payload: axiosPost("days", {}).then(res => res.data)
    });
  };
};
