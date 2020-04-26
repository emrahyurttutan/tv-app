import axios from "axios";
import { api } from "../../config";
import authService from "../authService";

const axiosGet = async (url, param, isData = false) => {
  let token = {};
  if (authService.isExistsToken()) {
    token = authService.getToken();
  }
  try {
    const response = await axios.get(api.baseURL + url, { token, ...param });
    const {
      data,
      dataList,
      success,
      dataCount,
      pageCount,
      errorList
    } = response.data;
    if (success) {
      if (isData) {
        return response.data;
      } else {
        return data
          ? { data, success, dataCount, pageCount }
          : { data: dataList, success, dataCount, pageCount };
      }
    } else {
      return { success, errorList, data };
    }
  } catch (error) {
    let data = [];
    if (error && error.response && error.response.data) {
      data = error.response.data;
    }
    return { error, success: false, data };
  }
};
export default axiosGet;
