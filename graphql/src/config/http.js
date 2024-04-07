const axios = require("axios");
const { getToken } = require("./tokenManager");

async function createApi() {
  const token = await getToken();
  console.log(token);
  return axios.create({
    baseURL: "https://us-central1-serveless-survey-api.cloudfunctions.net/api/",
    headers: {
      Authorization: `${token}`,
    },
  });
}

module.exports = createApi;
