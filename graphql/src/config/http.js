const axios = require("axios");

// import { env } from "./env"
// const defaultEnv = "production"

const api = axios.create({
  //baseURL: "https://assem.com.br/wp-json/wp/v2/",
  baseURL: "https://us-central1-serveless-survey-api.cloudfunctions.net/api/",
  headers: {
    Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImFkbWluIiwiaWF0IjoxNzEyMTEwNDM4LCJleHAiOjE3MTIxMTQwMzh9.AsS8-lffvaVMf5vswt-c-wNoFiCa0AQca1QvAgHjgr0`,
  }
});

module.exports = api;