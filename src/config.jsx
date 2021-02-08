// Config object to be passed to Msal on creation.
// For a full list of msal.js configuration parameters, 
// visit https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md


export const msalConfig = {
  clientId: "2ba6cb4d-a069-xxxx-91fa-xxxxxxxxxxxx",
  redirectUri: "http://localhost:3000/student-login",
  scopes: [
    'User.Read'
  ]
   
};




