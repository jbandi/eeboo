module.exports = {
  setLocalStorage() {
    global.localStorage = {
      getItem(key) {
        return this[key] || null;
      },
      setItem(key, value) {
        this[key] = value;
      },
      removeItem(key) {
        delete this[key];
      },
    };

    const jwt = require('jsonwebtoken'); // eslint-disable-line global-require
    const token = jwt.sign({ foo: 'bar', exp: Math.floor(Date.now() / 1000) + 3000 }, 'shhhhh');
    localStorage.setItem('id_token', token);
  },
};
