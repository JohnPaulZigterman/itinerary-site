const { Schema, Types, model } = require('mongoose');
const destinationSchema = require('./Destination');

const tripSchema = new Schema(
    {
        city: {
            type: String,
            required: true,
        },
        start: {
            type: String,
            required: true,
        },
        end: {
            type: String,
            required: true,
        },
        user: {
            type: String, 
            ref: 'User'
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