// Config object to be passed to Msal on creation.
// For a full list of msal.js configuration parameters, 
// visit https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
// Reference for writing and accessing all Microsoft methods/functions in this file is taken from https://github.com/microsoftgraph/msgraph-training-reactspa/tree/main/demo/graph-tutorial.
//The tutorial is in TypeScript, I have converted the code into JavaScript syntax.

export const msalConfig = {
  clientId: "2ba6cb4d-a069-4e65-91fa-82888b99763e",
  redirectUri: "http://localhost:3000/student-login",
  scopes: [
    'User.Read'
  ]
   
};




