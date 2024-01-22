const { User, Trip, Destination } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                .populate('trips')
                .populate('friends');
                return userData;
            }
              
            throw AuthenticationError;
        },

        users: async (parent, args, context) => {
            if (context.user) {
                const users = await User.find({})
                    .populate('trips')
                    .populate('friends');
                return users;
            }

            throw AuthenticationError;
        },

        user: async (parent, { username }, context) => {
            if (context.user) {
            const user = await User.findOne({username})
                .populate('trips')
                .populate('friends');
            return user;
            }
            
            throw AuthenticationError;
        },
        
        trips: async (parent, { username }, context) => {
            if (context.user) {
                const trips = await Trip.find({username})
                    .populate('destinations');
                return trips;
            }
            
            throw AuthenticationError;
        },

        trip: async (parent, { _id }, context) => {
            if (context.user) {
                const trip = await Trip.find({_id})
                    .populate('destinations');
                return trip;
            }
            
            throw AuthenticationError;
        },

        destinations: async (parent, { trip }, context) => {
            if (context.user) {
                const destinations = await Destination.find({trip});
                return destinations;
            }
            
            throw AuthenticationError;
        },

        destination: async (parent, { _id }, context) => {
            if (context.user) {
                const destination = await Destination.find({_id});
                return destination;
            }
            
            throw AuthenticationError;
        },
    },
    
    Mutation: {
        newUser: async (parent, { input }, context) => {
            const user = await User.create( input );
            const token = signToken(user);
            return { token, user };
        },

        updateUser: async (parent, { _id, input }, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    _id,
                    { input },
                    { new: true }
                );
                return updatedUser;
            }
            throw AuthenticationError;
        },

        deleteUser: async (parent,{ _id }, context) => {
            if (context.user) {
                const deletedUser = await User.findByIdAndDelete(_id);
                return deletedUser;
            }
            throw AuthenticationError;
        },

        newTrip: async (parent, { input }, context) => {
            if (context.user) {
                const newTrip = await Trip.create({
                    input,
                    username: context.user.username,
                });
                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { trips: newTrip._id } },
                    { new: true }
                );
                return newTrip;
            }
            throw AuthenticationError;
        },

        updateTrip: async (parent, { _id, input }, context) => {
            if (context.user) {
                const updatedTrip = await Trip.findByIdAndUpdate(
                    _id,
                    { input },
                    { new: true }
                );
                return updatedTrip;
            }
            throw AuthenticationError;
        },

        deleteTrip: async (parent, { _id }, context) => {
            if (context.user) {
                const deletedTrip = await Trip.findByIdAndDelete(_id);
                return deletedTrip;
            }
            throw AuthenticationError;
        },

        newDestination: async (parent, { input }, context) => {
            if (context.user) {
                const newDestination = await Destination.create({
                    input,
                    trip: context.trip._id,
                });
                await Trip.findByIdAndUpdate(
                    { _id: context.trip._id },
                    { $push: { destinations: newDestination._id } },
                    { new: true }
                );
                return newDestination;
            }
            throw AuthenticationError;
        },

        updateDestination: async (parent, { _id, input }, context) => {
            if (context.user) {
                const updatedDestination = await Destination.findByIdAndUpdate(
                    _id,
                    { input },
                    { new: true }
                );
                return updatedDestination;
            }
            throw AuthenticationError;
        },

        deleteDestination: async (parent, { _id }, context) => {
            if (context.user) {
                const deletedDestination = await Destination.findByIdAndDelete(_id);
                return deletedDestination;
            }
            throw AuthenticationError;
        },

        addFriend: async (parent, { friendId }, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { friends: friendId } },
                    { new: true }
                ).populate('friends');
                return updatedUser;
            }
            throw AuthenticationError;
        },

        deleteFriend: async (parent, { friendId }, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { friends: friendId } },
                    { new: true }
                ).populate('friends');
                return updatedUser;
            }
            throw AuthenticationError;
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('No user with this email found!');
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect password!');
            }
            const token = signToken(user);
            return { token, user };
        },
    }
};

module.exports = resolvers;