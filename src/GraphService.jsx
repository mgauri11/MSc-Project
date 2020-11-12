// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// <graphServiceSnippet1>
var graph = require('@microsoft/microsoft-graph-client');
//import { graph } from 'microsoft-graph-client';
//import { graph } from "@microsoft/microsoft-graph-client";

function getAuthenticatedClient(accessToken) {
  // Initialize Graph client
  const client = graph.Client.init({
    // Use the provided access token to authenticate
    // requests
    authProvider: (done) => {
      done(null, accessToken);
    }
  });

  return client;
}

export async function getUserDetails(accessToken) {
  const client = getAuthenticatedClient(accessToken);

  const user = await client.api('/me').get();
  //console.log("Working!!");
  return user;
}
// </graphServiceSnippet1>

// <getEventsSnippet>
/*export async function getEvents(accessToken) {
  const client = getAuthenticatedClient(accessToken);

  const events = await client
    .api('/me/events')
    .select('subject,organizer,start,end')
    .orderby('createdDateTime DESC')
    .get();

  return events;
}*/
// </getEventsSnippet>
