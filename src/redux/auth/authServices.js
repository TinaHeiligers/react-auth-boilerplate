import axios from 'axios';
import config from '../../config';
const baseURL = config.apiUrl;

export const loginPassword = (data) => {
  const url = `http://localhost:4000/auth/password`;
  const stringyfiedData = JSON.stringify(data);
  // Default options are marked with *
  return fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'include', // include, same-origin, *omit
      headers: {
        Accept : 'application/json'
      },
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // no-referrer, *client
      body: stringyfiedData, // body data type must match "Content-Type" header
  })
  .then(response => response.json()) // parses response to JSON
  .catch(error => console.error(`Fetch Error =\n`, error));
};

export const loginGoogle = (options) => {
  new Promise((resolve, reject) => {
    const result = axios.post(`${baseURL}/auth/google`, options)
    .then(resolve)
    .catch(error => reject(error));
    return result;
  });
}

export const logOut = () => {
  const url = `${baseURL}/auth/logout`;
  return fetch(url, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      Accept : 'Access-Control',
    },
    redirect: 'follow',
    referrer: 'no-referrer',
  })
  .then(response => JSON.stringify(response))
  .catch(error => console.error(`Fetch Error =\n`, error));
};

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ZmZjMzEwOC1mZTY3LTRiMTItOWU1Ny0zNWZhOTFhYjliODEiLCJpYXQiOjE1MzI2MTc1OTEsImV4cCI6MTUzMjY2MDc5MX0.YZnccsjGK1OCowzrzhViZtaF62hNtxADNmM2uHfYnWk'
export const fetchClientsFromFIT = () => {
  const url= `http://findlawfitservice-env.p3wwrxabvq.us-east-2.elasticbeanstalk.com/fit/account`;
  return fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'include', // include, same-origin, *omit
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    // referrer: 'no-referrer', // no-referrer, *client
  })
}
