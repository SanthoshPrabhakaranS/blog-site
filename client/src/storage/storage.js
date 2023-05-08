export default class Storage {
  setItem(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key) {
   const value = sessionStorage.getItem(key);
   return JSON.parse(value)
  }

  removeItem(key) {
    const value = JSON.stringify(key);
    sessionStorage.removeItem(value);
  }

  clearStorage() {
    sessionStorage.clear();
  }
}
