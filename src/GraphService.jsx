// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// <graphServiceSnippet1>
var graph = require('@microsoft/microsoft-graph-client');


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
  //const event= {}
  const event = {
    subject: "Prep for customer meeting",
    body: {
      contentType: "Text",
      content: "Feedback questions"
    },
    start: {
        dateTime: "2021-11-20T13:00:00",
        timeZone: "UTC"
    },
    end: {
        dateTime: "2021-11-20T14:00:00",
        timeZone: "UTC"
    },
    
    attendees: [
      {
        emailAddress: {
          address:"Rochan@cardiff.ac.uk",
          name: "Matthew"
        }
       
      }
    ],
    allowNewTimeProposals: true,
    isOnlineMeeting: true,
    onlineMeetingProvider: "teamsForBusiness"
};
  
  let res = await client.api('/me/events')
    .post(event);
    //console.log(res)
  

  
}*/
// </getEventsSnippet>
