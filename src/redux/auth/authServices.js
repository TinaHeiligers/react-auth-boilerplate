export const fetchJSON = (url, options = {}) => 
  new Promise((resolve, reject) => {
    return fetch(url, options)
      .then(response => (response.status !== 200 ? reject(response) : response))
      .then(response => response.json())
      .then(response => resovle(response))
      .catch(error => reject(error));
  });
