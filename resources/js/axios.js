import axios from 'axios';

const mainURL = axios.create({
  /** localhost */
  // baseURL: 'http://localhost:8000/api/v1',
  /** development */
  // baseURL: 'https://templatevue.yogabayuap.com/api/v1',
  /** production */
  baseURL: 'https://ecar.bankarthaya.com/api/v1',
});
// Interceptor untuk menambahkan token ke header Authorization
mainURL.interceptors.request.use(
  config => {
    const savedUserToken = localStorage.getItem("userToken");
    if (savedUserToken) {
      config.headers.Authorization = `Bearer ${savedUserToken}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default mainURL;
