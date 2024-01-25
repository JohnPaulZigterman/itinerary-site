const { Schema, Types, model } = require('mongoose');

const destinationSchema = new Schema(
    {
        location: {
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