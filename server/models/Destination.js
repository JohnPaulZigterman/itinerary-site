const { Schema, Types, model } = require('mongoose');

const destinationSchema = new Schema(
    {
        location: {
            type: String,
            required: true,
        },

        when: {
            type: String
        },

        trip: {
            type: Schema.Types.ObjectId, 
            ref: 'Trip'
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