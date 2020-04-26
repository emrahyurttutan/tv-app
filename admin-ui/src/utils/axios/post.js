import axios from "axios";
import { api } from "../../config";
import authService from "../authService";
const axiosPost = async (url, param, isData = false) => {
  /**
   * redux rejected reducer için kapatıldı.
   */
  let token = {};
  if (authService.isExistsToken()) {
    token = authService.getToken();
  }

  try {
    const response = await axios.post(api.baseURL + url, {
      token,
      ...param
    });
    const {
      data,
      dataList,
      success,
      dataCount,
      pageCount,
      message
    } = response.data;
    if (isData) {
      return response.data;
    }
    if (success) {
      return data
        ? { data, success, dataCount, pageCount, message }
        : { data: dataList, success, dataCount, pageCount, message };
    } else {
      return { success, data, message };
    }
    // return success
    //   ? data
    //     ? { data, success, dataCount, pageCount }
    //     : { data: dataList, success, dataCount, pageCount }
    //   : { success, errorList, data };
  } catch (error) {
    let data = [];
    if (error && error.response && error.response.data) {
      data = error.response.data;
    }
    return { error, success: false, data };
  }
};
export default axiosPost;
