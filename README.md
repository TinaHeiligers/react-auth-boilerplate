# Troubleshooting
If you get the error: 'idpiframe_initialization_failed' in Chrome, try a different browser. If it works there, then clear your Chrome cache (warning: this will log you out of all browser apps), refresh and try again.

If you get a global error when running tests try uninstsalling and reinsstalling watchman. 
`Brew uninstall watchman`
`Brew install watchman`

# Auth
Authentication is through Google using the client-side first, then the server side verification method (see [here](https://medium.com/@stepankuzmin/authentication-with-react-router-redux-5-x-and-redux-saga-55da66b54be7) for details).
The redux methods and work flow for this was inspired by [Stepan Kuzmin's blog post](https://medium.com/@stepankuzmin/authentication-with-react-router-redux-5-x-and-redux-saga-55da66b54be7)
In the demo mode, the actual call to a backend is not made, although the fetch method is in the authServices file. The preparation of the payload to send is done in the authSaga. A mock call to a backend will resolve successfully when the login email matches anything@example.com and the password is 'password'. The mock call does not encrypt the password and sets the token on the redux store, under 'auth' to be 'secret-token'.

# IE9 
This project uses axios to make http calls and axios is not supported by IE9. There are 2 options to get aruond ths, should the final prooject support IE11:
1. Eject from create react app and add an axios polyfill to webpack.
2. Don't eject from create react app and replace axios with fetch.