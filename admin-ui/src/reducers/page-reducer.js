import {
  PAGE_INPUT_CHANGE,
  PAGE_FORM_ERROR_CHANGE,
  PAGE_FORM_SHOW_LOADER,
  PAGE_FORM_HIDE_LOADER,
  PAGE_MODAL,
  PAGE_MODAL_HIDE,
  PAGE_MODAL_SHOW,
  SET_PAGE_EDIT_DATA_FULLFILLED,
  PAGE_FORMDATA_CLEAN
} from "../actions/action-types";

const initialState = {
  formLoader: false,
  formData: { onay: true, embed: false },
  formErrors: {},
  isModal: false,
  modal: {}
};

/**
 * Page İşlemlerinin Sağlandığı Reducer
 * @param {*} state
 * @param {*} action
 */
export default function pageReducer(state = initialState, action) {
  switch (action.type) {
    case PAGE_INPUT_CHANGE:
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.key]: action.value
        }
      };
    case PAGE_FORM_ERROR_CHANGE:
      return {
        ...state,
        formErrors: action.formErrors
      };
    case PAGE_FORM_SHOW_LOADER:
      return {
        ...state,
        formLoader: action.formLoader
      };
    case PAGE_FORM_HIDE_LOADER:
      return {
        ...state,
        formLoader: action.formLoader
      };
    case PAGE_MODAL:
      return {
        ...state,
        modal: action.payload,
        isModal: true,
        isExtraModal: false
      };

    case PAGE_MODAL_HIDE:
      return {
        ...state,
        isModal: action.isModal
      };
    case PAGE_MODAL_SHOW:
      return {
        ...state,
        isModal: action.isModal
      };

    case SET_PAGE_EDIT_DATA_FULLFILLED:
      return {
        ...state,
        pageEditData: action.payload,
        formData: action.payload
      };

    case PAGE_FORMDATA_CLEAN:
      return {
        ...state,
        formData: initialState.formData
      };

    default:
      return state;
  }
}
