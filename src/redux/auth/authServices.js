// TODO: convert to axios, see https://kapeli.com/cheat_sheets/Axios.docset/Contents/Resources/Documents/index
import axios from 'axios';
import config from '../../config.js';
const baseURL = config.apiUrl;

export const fetchLoginAPI = (options = {}) => {
  new Promise((resolve, reject) => {
    return fetch(`${baseURL}/loginBasic`, options)
      .then(response => (response.status !== 200 ? reject(response) : response))
      .then(response => response.json())
      .then(response => resolve(response))
      .catch(error => reject(error));
  });
}
export const fetchVerifyToken = (baseURL, options = {}) => {
  new Promise((resolve, reject) => {
    return fetch(`${baseURL}/verifyGoogleTempToken`, options)
      .then(response => (response.status !== 200 ? reject(response) : response))
      .then(response => response.json())
      .then(response => resolve(response))
      .catch(error => reject(error));
  });
}
// After client auth with Google;
//https://developers.google.com/identity/sign-in/web/backend-auth

// REPLACING THESE METHODS WITH AXIOS:
export const axiosLoginAPI = (options) => {
  new Promise((resolve, reject) => {
    return axios.post(`${config.baseUrl}/loginWithEmail`, options)
    .then(resolve)
    .catch(error => reject(error));
  });
}

export const axiosVerifyToken = (options) => {
  new Promise((resolve, reject) => {
    return axios.post(`${baseURL}/verifyGoogleTempToken`, options)
    .then(resolve)
    .catch(error => reject(error));
  });
}
export const axiosLoginGoogle = () => {
  new Promise((resolve, reject) => {
    const result = axios.post(`${baseURL}/auth/google`)
    .then(resolve)
    .catch(error => reject(error));
    console.log("In axiosLoginGoogle", result)
    return result;
  });
}