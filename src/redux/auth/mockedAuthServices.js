// MOCKED SERVICES
import { validateEmail } from '../../utils/validations';

export const emailPasswordAuthMock = (login, password) =>
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
    const tempToken = options.headers.Authorization;
    if (tempToken) {
      resolve({ token: 'verified-google-token' });
    } else {
      reject({ status: 401 });
    }
  });
