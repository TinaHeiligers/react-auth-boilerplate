# Troubleshooting
If you get the error: 'idpiframe_initialization_failed' in Chrome, try a different browser. If it works there, then clear your Chrome cache (warning: this will log you out of all browser apps), refresh and try again.

#Auth
Authentication is through Google using the client-side first, then the server side verification method (see [here](https://medium.com/@stepankuzmin/authentication-with-react-router-redux-5-x-and-redux-saga-55da66b54be7) for details).
The redux methods and work flow for this was inspired by [Stepan Kuzmin's blog post](https://medium.com/@stepankuzmin/authentication-with-react-router-redux-5-x-and-redux-saga-55da66b54be7)