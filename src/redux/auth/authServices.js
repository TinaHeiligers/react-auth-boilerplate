// TODO: convert to axios, see https://kapeli.com/cheat_sheets/Axios.docset/Contents/Resources/Documents/index
import { validateEmail } from '../../utils/validations';

export const fetchJSON = (url, options = {}) => 
  new Promise((resolve, reject) => {
    return fetch(url, options)
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


// After client auth with Google;
//https://developers.google.com/identity/sign-in/web/backend-auth