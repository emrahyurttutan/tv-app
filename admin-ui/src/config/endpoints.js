const prodConfig = {
  baseURL: "https://tvapi.yurttutan.net/",
  cdnURL: "https://tvapi.yurttutan.net/"
};

const devConfig = {
  baseURL: "https://tvapi.yurttutan.net/",
  cdnURL: "https://tvapi.yurttutan.net/"
};

let env = null;

if (process.env.NODE_ENV && process.env.NODE_ENV.length > 0) {
  env = process.env.NODE_ENV;
}
const api =
  env === null ? prodConfig : env === "production" ? prodConfig : devConfig;
export default api;
