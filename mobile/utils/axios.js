import axios from "axios";

export const axiosPost = async (url, param) => {
  try {
    const response = await axios.post(
      "https://tvapi.yurttutan.net/" + url,
      param
    );
    const {
      data,
      dataList,
      success,
      dataCount,
      pageCount,
      message
    } = response.data;

    if (success) {
      return data
        ? { data, success, dataCount, pageCount, message }
        : { data: dataList, success, dataCount, pageCount, message };
    } else {
      return { success, data, message };
    }
  } catch (error) {
    let data = [];
    if (error && error.response && error.response.data) {
      data = error.response.data;
    }
    return { error, success: false, data };
  }
};
