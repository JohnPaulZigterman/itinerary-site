const { User, Trip, Destination } = require('../models');

const resolvers = {
    Query: {
        user: async () => {
            return User.find({});
        },
        trip: async () => {
            return Trip.find({});
        },
        destination: async () => {
            return Destination.find({});
        }
    },
    Mutation: {
        createUser: async (parent, args) => {
            const user = await User.create(args);
            return user;
        },
        createTrip: async (parent, args) => {
            const trip = await Trip.create(args);
            return trip;
        },
        createDestination: async (parent, args) => {
            const destination = await Destination.create(args);
            return destination;
        },
    },
};

module.exports = resolvers;