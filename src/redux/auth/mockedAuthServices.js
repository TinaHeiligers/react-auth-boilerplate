// MOCKED SERVICES
import { validateEmail } from '../../utils/validations';

export const authMock = (login, password) =>
  new Promise((resolve, reject) => {
    if (validateEmail(login) && password === 'password') {
      resolve({ token: 'secret-token' });
    } else {
      reject({ status: 401 });
    }
  });

export const tokenVerifyMock = (options) =>
  // this should be a JWT token
  new Promise((resolve, reject) => {
    const tempToken = JSON.parse(options.body);
    if (tempToken.idToken) {
      resolve({ token: 'verified-google-token' });
    } else {
      reject({ status: 401 });
    }
  });
