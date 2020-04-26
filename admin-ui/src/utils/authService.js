const authService = {
  /**
   * Eğer localStorage üzerinde token varsa true döner.
   */
  isExistsToken() {
    if (
      localStorage.getItem("user") &&
      JSON.parse(localStorage.getItem("user")).token
    ) {
      return true;
    }
    return false;
  },

  /**
   * Giriş yapılma esnasında localstorage'e aldığı objeyi kaydeder.
   * @param {object} res -- {info: {}, token: {}} şeklinde bir obje alır.
   */
  signIn(res) {
    localStorage.setItem("user", JSON.stringify(res));
  },

  /**
   * Çıkış yapılma esnasında localStorage'den user objesini siler.
   */
  signOut() {
    localStorage.removeItem("user");
  },

  /**
   * Localstorage üzerinden user objesi içerisinden token objesini döner.
   */
  getToken() {
    if (
      localStorage.getItem("user") &&
      JSON.parse(localStorage.getItem("user")).token
    ) {
      return JSON.parse(localStorage.getItem("user")).token;
    }
  },

  /**
   * Localstorage üzerinden user objesi içerisinde info objesini döner.
   */
  getInfo() {
    if (
      localStorage.getItem("user") &&
      JSON.parse(localStorage.getItem("user")).info
    ) {
      return JSON.parse(localStorage.getItem("user")).info;
    }
  }
};
export default authService;
