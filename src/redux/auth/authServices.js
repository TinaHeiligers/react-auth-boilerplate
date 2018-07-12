import axios from 'axios';
import config from '../../config.js';
const baseURL = config.apiUrl;

export const axiosLoginAPI = (options) => {
  new Promise((resolve, reject) => {
    console.log('Sending info to the server:', options)
    return axios.post(`${config.baseUrl}/auth/password`, options)
    .then(resolve)
    .catch(error => reject(error));
  });
}

export const loginGoogle = (options) => {
  new Promise((resolve, reject) => {
    const result = axios.post(`${baseURL}/auth/google`, options)
    .then(resolve)
    .catch(error => reject(error));
    console.log("In axiosLoginGoogle", result)
    return result;
  });
}