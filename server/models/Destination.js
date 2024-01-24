const { Schema, Types, model } = require('mongoose');

const moment = require('moment');

const destinationSchema = new Schema(
    {
        location: {
            type: String,
            required: true,
        },
        when: {
            type: String,
            required: true,
            default: Date.now,
            get: timeStamp => moment(timeStamp).format("MMM DD, YYYY [at] hh:mm a"),
        },
        trip: {
            type: String,
            required: true
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

const Destination = model('Destination', destinationSchema);

module.exports = Destination;