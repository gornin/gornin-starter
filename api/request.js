// api/request.js
const axios = require("axios");

class HttpRequest {
  constructor(options = {}) {
    this.commonOptions = options;
  }
  getInsideConfig() {
    const configs = {
      ...this.commonOptions,
    };
    return configs;
  }
  interceptors(instance, options) {
    // console.log(options);
  }
  request(options) {
    const instance = axios.create({});
    options = Object.assign(this.getInsideConfig(), options);
    this.interceptors(instance, options);
    return instance(options);
  }
}

module.exports = HttpRequest;
