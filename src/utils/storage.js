/*
 *  localStorage 永久性存储
 *  sessionStorage 回话存储 关闭浏览器后将丢失
 */
const storage = {
  ls: {
    get(key) {
      try {
        return JSON.parse(localStorage.getItem(key));
      } catch (err) {
        return localStorage.getItem(key);
      }
    },
    set(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    },
    remove(key) {
      localStorage.removeItem(key);
    },
    clear() {
      localStorage.clear();
    }
  },
  ss: {
    get(key) {
      try {
        return JSON.parse(sessionStorage.getItem(key));
      } catch (err) {
        return sessionStorage.getItem(key);
      }
    },
    set(key, value) {
      sessionStorage.setItem(key, JSON.stringify(value));
    },
    remove(key) {
      sessionStorage.removeItem(key);
    },
    clear() {
      sessionStorage.clear();
    }
  }
};

export default storage;
