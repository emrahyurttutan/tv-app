import {
  SET_USER_AUTHORIZATION_MENUS,
  SHOW_LOADER,
  HIDE_LOADER,
  SHOW_USER_PROFILE,
  HIDE_USER_PROFILE,
  MENU_ITEM_CLICK,
  MENU_ACTIVE_ITEM_CHANGE,
  TOGGLE_MENU,
  SET_CHANNEL_LIST_FULLFILLED,
  SET_DAY_LIST_FULLFILLED,
  SET_CATEGORY_LIST_FULLFILLED
} from "../actions/action-types";

const initialState = {
  menu: [],
  appLoading: false,
  isUserProfile: false,
  layoutMode: "static",
  layoutColorMode: "dark",
  staticMenuInactive: false,
  overlayMenuActive: false,
  mobileMenuActive: false,
  activeItem: null,
  channelList: [],
  dayList: [],
  categoryList: []
};

/**
 * Uygulamanın tamamında kullanılan İşlemlerinin Sağlandığı Reducer
 * @param {*} state
 * @param {*} action
 */
export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_LOADER:
      return {
        ...state,
        appLoading: true
      };
    case HIDE_LOADER:
      return {
        ...state,
        appLoading: false
      };
    case SHOW_USER_PROFILE:
      return {
        ...state,
        isUserProfile: true
      };
    case HIDE_USER_PROFILE:
      return {
        ...state,
        isUserProfile: false
      };
    case SET_USER_AUTHORIZATION_MENUS:
      return {
        ...state,
        authmenu: action.authmenu,
        menu: action.payload
      };
    case MENU_ACTIVE_ITEM_CHANGE:
      return {
        ...state,
        activeItem: action.activeItem
      };

    case MENU_ITEM_CLICK:
      return {
        ...state,
        overlayMenuActive: false,
        mobileMenuActive: state.mobileMenuActive
          ? state.mobileMenuActive
          : false
      };
    case TOGGLE_MENU:
      let overlayMenuActive = state.overlayMenuActive;
      let staticMenuInactive = state.staticMenuInactive;
      let mobileMenuActive = state.mobileMenuActive;
      if (window.innerWidth > 1024) {
        if (state.layoutMode === "overlay") {
          overlayMenuActive = !overlayMenuActive;
        } else if (state.layoutMode === "static") {
          staticMenuInactive = !staticMenuInactive;
        }
      } else {
        mobileMenuActive = !mobileMenuActive;
      }
      return {
        ...state,
        mobileMenuActive,
        staticMenuInactive,
        overlayMenuActive
      };
    case SET_CHANNEL_LIST_FULLFILLED:
      return {
        ...state,
        channelList: action.payload
      };
    case SET_DAY_LIST_FULLFILLED:
      return {
        ...state,
        dayList: action.payload
      };

    case SET_CATEGORY_LIST_FULLFILLED:
      return {
        ...state,
        categoryList: action.payload
      };

    default:
      return state;
  }
}
