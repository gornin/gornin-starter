// api/interface/index.js
const axios = require("../api.request");

const getRepoList = (params, username) => {
  return axios.request({
    url: `https://api.github.com/users/${username}/repos`,
    params,
    method: "get",
  });
};

module.exports = {
  getRepoList,
};
