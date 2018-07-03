Take the short lived token in the Google response (key: Zi.access_token) and send that back to the server.
The server then needs to take the token, send it back to Google and get a more perminant token.
  see https://developers.google.com/identity/sign-in/web/backend-auth
Create the user account from the profile info returned (here or earlier?)
Create a cookie for the user
Send the cookie back to the client.
figure out how to get the cookie from the server and use it.


Logging out:
Local storage items are removed on log out,
The redux store is cleared of all items except for the routing items.
TODO: Clear cookies on log out.