// api/interface/index.js
const axios = require("../api.request");

const getRepoList = (params) => {
  return axios.request({
    url: "https://api.github.com/users/buingao/repos",
    params,
    method: "get",
  });
};

module.exports = {
  getRepoList,
};
