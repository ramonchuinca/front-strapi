// src/utils/axios.js
import axios from 'axios';

// Definindo a URL base da API (substitua pela URL da sua API Strapi)
const axiosInstance = axios.create({
  baseURL: 'http://localhost:1337/api',  // Substitua pelo URL do seu servidor Strapi
  headers: {
    'Content-Type': 'application/json',
    
    'Authorization': `Bearer c0e0e9674835d51f582e42e6ed9c7a11e03ccbe19a9fca6069444660fe246e870eadf95547deee7e921c7fb4c3ebae174f11ce3ba37a804815db369ba73deba6b6cd8801ba359086cdb1b88102070355537539b6620470e75b64e46d5886b0b9e5f5171e1ab08769b5f5c6655fc38985d051cca8520a8dd39d3ee725a6095727`
  },
});

export default axiosInstance;
