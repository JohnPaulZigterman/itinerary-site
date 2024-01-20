const { Schema, Types, model } = require('mongoose');

const moment = require('moment');


const tripSchema = new Schema(
    {
        city: {
            type: String,
            required: true,
        },
        when: {
            type: Date,
            required: true,
            default: Date.now,
            get: timeStamp => moment(timeStamp).format("MMM DD, YYYY [at] hh:mm a"),
        },
        username: {
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
        id: false,
    }
);

tripSchema
    .virtual('destinationCount')
    .get(function () {
        return this.destinations.length;
    });

const Trip = model('Trip', tripSchema);

module.exports = Trip;