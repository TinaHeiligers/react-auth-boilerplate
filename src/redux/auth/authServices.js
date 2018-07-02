// TODO: convert to axios, see https://kapeli.com/cheat_sheets/Axios.docset/Contents/Resources/Documents/index
import { validateEmail } from '../../utils/validations';
const baseURL = 'http://localhost:4000';

export const fetchJSON = (options = {}) => 
  new Promise((resolve, reject) => {
    return fetch(`${baseURL}/loginBasic}`, options)
      .then(response => (response.status !== 200 ? reject(response) : response))
      .then(response => response.json())
      .then(response => resolve(response))
      .catch(error => reject(error));
  });

export const authMock = (login, password) =>
  new Promise((resolve, reject) => {
    if (validateEmail(login) && password === 'password') {
      resolve({ token: 'secret-token' });
    } else {
      reject({ status: 401 });
    }
  });

export const verifyToken = (baseURL, options = {}) => {
  new Promise((resolve, reject) => {
    return fetch(`${baseURL}/verifyGoogleTempToken`, options)
      .then(response => (response.status !== 200 ? reject(response) : response))
      .then(response => response.json())
      .then(response => resolve(response))
      .catch(error => reject(error));
  });
// After client auth with Google;
//https://developers.google.com/identity/sign-in/web/backend-auth