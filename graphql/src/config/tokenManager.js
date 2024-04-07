const axios = require('axios');

let tokenCache = {
  value: null,
  expiry: null
};

async function login() {
  try {
    const response = await axios.post("https://us-central1-serveless-survey-api.cloudfunctions.net/api/login", {
      login: 'admin',
      password: '123Demo@456'
    });
    const { token, expiresIn } = response.data;  // Supondo que o servidor responde com o token e o tempo de expiração
    const expiry = Date.now() + expiresIn * 1000; // Convertendo expiresIn para milissegundos
    tokenCache = { value: token, expiry };
    return token;
  } catch (error) {
    console.error("Erro ao realizar login:", error);
    throw new Error("Login failed");
  }
}

async function getToken() {
  if (!tokenCache.value || tokenCache.expiry < Date.now()) {
    return await login();
  }
  return tokenCache.value;
}

module.exports = {
  getToken
};