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
  const tempToken = options.body.idtoken;
  // this should be a JWT token
  new Promise((resolve, reject) => {
    if (tempToken) {
      resolve({ token: 'verified-google-token' });
    } else {
      reject({ status: 401 });
    }
  });
