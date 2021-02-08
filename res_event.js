import mongoose from "mongoose";
import { Schema } from 'mongoose'

//Create Schema
const EventSchema = new Schema({

    Event_info: [{

        Module: String,

        event: {
            allowNewTimeProposals: Boolean,
            attendees: [{
                emailAddress:{
                    address: String,
                    name: String
                }
            }],
            body: {
                content: String,
                contentType: String
            },
            end: {
                dateTime: String,
                timezome: String

            },
            isonlineMeeting: Boolean,
            onlineMeetingProvider: String,
            organizer:{
                emailAddress:{
                    address: String,
                    name: String
                }

            },
            start: {

                dateTime: String,
                timezome: String
            },
            subject: String
        } 

    }]

   

});

const Event = mongoose.model("eventinfo", EventSchema);

export default Event;
