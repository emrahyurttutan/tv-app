import {
  PAGE_INPUT_CHANGE,
  PAGE_FORM_HIDE_LOADER,
  PAGE_FORM_SHOW_LOADER,
  PAGE_MODAL,
  PAGE_FORM_ERROR_CHANGE,
  PAGE_MODAL_HIDE,
  PAGE_MODAL_SHOW,
  SET_PAGE_EDIT_DATA,
  PAGE_FORMDATA_CLEAN
} from "./action-types";
import { axiosPost } from "../utils/axios";

/**
 * Form Input Değişimlerinde Tetiklenir.
 * @param {string} key -- Gelen Input Keyi (bkz: "email"),
 * @param {string} value -- Gelen Input Value'su
 */
export function pageInputChange(key, value) {
  return {
    type: PAGE_INPUT_CHANGE,
    key,
    value
  };
}

/**
 * Form Inputlarının Hatalı Olması Durumunda Tetiklenir.
 * @param {object} formErrors -- Gelen Hata Objesi
 */
export function pageFormErrorChange(formErrors) {
  return {
    type: PAGE_FORM_ERROR_CHANGE,
    formErrors
  };
}

/**
 *  Form Loaderin Aktif Olmasını Tetikler.
 */
export function pageFormShowLoader() {
  return {
    type: PAGE_FORM_SHOW_LOADER,
    formLoader: true
  };
}

/**
 *  Form Loaderin Pasif Olmasını Tetikler.
 */
export function pageFormHideLoader() {
  return {
    type: PAGE_FORM_HIDE_LOADER,
    formLoader: false
  };
}

/**
 *  Sayfadaki modal açar
 */
export function pageModalShow() {
  return {
    type: PAGE_MODAL_SHOW,
    isModal: true
  };
}
/**
 *  Sayfadaki modal kapatır
 */
export function pageModalHide() {
  return {
    type: PAGE_MODAL_HIDE,
    isModal: false
  };
}

/**
 * page Modal
 * @param {object} payload
 */
export function pageModal(payload) {
  return { type: PAGE_MODAL, payload };
}

/**
 * sayfadaki form datalarını temizler.
 * sayfa geçişlerinde özellikle
 */
export const pageFormDataClean = () => {
  return { type: PAGE_FORMDATA_CLEAN };
};

/**
 * Düzenleme sayfalarının endpoint urllesi verilen dataları çeker.
 *
 * @param {string} url
 * @param {string} loaderGroup
 * @param {object} params
 */

export const pageEditData = (url, params = {}, loaderGroup = "pageEdit") => {
  return dispatch => {
    dispatch({
      type: SET_PAGE_EDIT_DATA,
      meta: { loaderGroup },
      payload: axiosPost(url, params).then(res => res.data)
    });
  };
};

/**
 *
 * Yeni ekleme ve düzenleme sayfalarında kaydetme işlemini gerçekleştiren action
 *
 * @param {string} url
 * @param {object} success
 * @param {object} error
 * @param {object} param
 */
export const pageSaveOrUpdate = (url, success, error, param = null) => {
  return (dispatch, getState) => {
    let requestParam = param ? param : getState().page.formData;
    axiosPost(url, {
      data: requestParam
    }).then(res => {
      if (res.success) {
        if (success && success.modal) {
          success.modal.children = res.message;
          success.modal.className = "page-modal-success";
          dispatch(pageModal(success.modal));
        }
      } else {
        if (error && error.modal) {
          error.modal.children = res.message;
          error.modal.className = "page-modal-error";
          dispatch(pageModal(error.modal));
        }
      }
    });
  };
};

/**
 *
 * Silme işlemini gerçekleştiren action
 *
 * @param {string} url
 * @param {object} success
 * @param {object} error
 * @param {object} param
 */
export const pageDelete = (
  url,
  param = null,
  success = { modal: { title: "Silme İşlemi Başarılı" } },
  error = { modal: { title: "Silme İşlemi Başarısız" } }
) => {
  return dispatch => {
    let requestParam = param ? { id: param } : {};
    axiosPost(url, {
      data: requestParam
    }).then(res => {
      if (res.success) {
        if (success && success.modal) {
          success.modal.children = res.message;
          success.modal.className = "page-modal-success";
          if (success.successCallBack) {
            success.successCallBack();
          }
          dispatch(pageModal(success.modal));
        }
      } else {
        if (error && error.modal) {
          error.modal.children = res.message;
          error.modal.className = "page-modal-error";
          dispatch(pageModal(error.modal));
        }
      }
    });
  };
};
