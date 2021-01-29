// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
// Reference for writing and accessing all Microsoft methods/functions in this file is taken from https://github.com/microsoftgraph/msgraph-training-reactspa/tree/main/demo/graph-tutorial.
//The tutorial is in TypeScript, I have converted the code into JavaScript syntax.


var graph = require('@microsoft/microsoft-graph-client');


function getAuthenticatedClient(accessToken) {
  // Initialize Graph client
  const client = graph.Client.init({
    // Use the provided access token to authenticate requests
    authProvider: (done) => {
      done(null, accessToken);
    }
  });

  return client;
}

export async function getUserDetails(accessToken) {
  const client = getAuthenticatedClient(accessToken);

  const user = await client.api('/me').get();
  console.log("Working!!");
  return user;
}
