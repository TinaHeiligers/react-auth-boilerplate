# Quick Start
Clone the repo to your local machine:
`git clone https://github.com/<YourRepo>/react-auth-boilerplate.git`
Install the packages (I use yarn version 1.7.0):
`yarn install`
Run the tests:
`yarn test`
The project currently has mocked out calls to a backend but makes a real call to Google when clicking the "Login with Google" button. Initiating the call will require a GOOGLE_CLIENT_ID that is not checked in to github. 
Review [Google's OAuth 2.0 documentation](https://developers.google.com/identity/protocols/OAuth2).
Set up an [oauth account](https://github.com/hapijs/bell/blob/master/API.md) and follow the instructions on how to get a cookie password
To set up additional Google provider keys, see the [Auth0 docs](https://auth0.com/docs/connections/social/devkeys)
 - `GOOGLE_CLIENT_ID`
 - `GOOGLE_CLIENT_SECRET`
Add the GOOGLE_CLIENT_ID either directly in the 'clientId' prop on <GoogleLogin /> (not recommended) or to a 'constants.js' file within the folder 'src/redux/auth'.
While this project does not currently rely on a backend, one is being build.
Run the project:
`yarn start`.
Use the following credentials when logging in with email and password: 
email pattern = /^.+@example\.com$/, password = password.

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