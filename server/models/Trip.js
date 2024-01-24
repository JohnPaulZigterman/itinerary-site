const { Schema, Types, model } = require('mongoose');
const destinationSchema = require('./Destination');

const moment = require('moment');


const tripSchema = new Schema(
    {
        city: {
            type: String,
            required: true,
        },
        start: {
            type: String,
            required: true,
            default: Date.now,
            get: timeStamp => moment(timeStamp).format("MMM DD, YYYY [at] hh:mm a"),
        },
        end: {
            type: String,
            required: true,
            default: Date.now,
            get: timeStamp => moment(timeStamp).format("MMM DD, YYYY [at] hh:mm a"),
        },
        user: {
            type: String,
            required: true,
        },
        destinations: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Destination',
            },
        ],
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

tripSchema
    .virtual('destinationCount')
    .get(function () {
        return this.destinations.length;
    });

const Trip = model('Trip', tripSchema);

module.exports = Trip;