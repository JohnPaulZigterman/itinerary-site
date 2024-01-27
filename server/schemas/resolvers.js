const { User, Trip, Destination } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                // Add .populate() method here to populate trips and then destinations
                    .populate({ path: 'trips', populate: 'destinations' })
                    .populate('friends');
                return userData;
            }
              
            throw AuthenticationError;
        },

        users: async (parent, args, context) => {
            if (context.user) {
                const users = await User.find({})
                    .populate({ path: 'trips', populate: 'destinations' })
                    .populate('friends');
                return users;
            }

            throw AuthenticationError;
        },

        user: async (parent, { username }, context) => {
            if (context.user) {
            const user = await User.findOne({username})
                .populate({ path: 'trips', populate: 'destinations' })
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

        tripsByCity: async (parent, { city }, context) => {
            if (context.user) {
                const trips = await Trip.find({city})
                    .populate('destinations');
                return trips;
            }

            throw AuthenticationError;
        },

        trip: async (parent, { _id }, context) => {
            if (context.user) {
                const trip = await Trip.findById(_id)
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
        newUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },

        updateUser: async (parent, { _id, username, email, password }, context) => {
            // only allow logged in users to update their own profile
            if (context.user && context.user._id === _id) {
                const updatedUser = await User.findByIdAndUpdate(
                    _id,
                    { username, email, password },
                    { new: true }
                );
                return updatedUser;
            }
            throw AuthenticationError;
        },

        deleteUser: async (parent, { _id }, context) => {
            // only allow logged in users to delete their own profile
            if (context.user && context.user._id === _id) {
                // delete all of the user's trips
                const user = await User.findById(_id).populate('trips');
                for (let trip of user.trips) {
                    // delete all of the trip's destinations
                    const populatedTrip = await Trip.findById(trip._id).populate('destinations');
                    await Destination.deleteMany({ trip: populatedTrip._id });
                    await Trip.findByIdAndDelete(populatedTrip._id);
                }
        
                const deletedUser = await User.findByIdAndDelete(_id);
                return deletedUser;
            }
            throw AuthenticationError;
        },

        newTrip: async (parent, { city, start, end }, context) => {
            if (context.user) {
                const newTrip = await Trip.create({ city, start, end, username: context.user.username,
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

        updateTrip: async (parent, { _id, city, start, end }, context) => {
            if (context.user) {
                const updatedTrip = await Trip.findByIdAndUpdate(
                    _id,
                     { city, start, end },
                    { new: true }
                );
                return updatedTrip;
            }
            throw AuthenticationError;
        },

        deleteTrip: async (parent, { _id }, context) => {
            if (context.user) {
                await Destination.deleteMany({ trip: _id });

                const deletedTrip = await Trip.findByIdAndDelete(_id);
                // remove the trip from the user's trips
                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { trips: _id } },
                    { new: true }
                );

                return deletedTrip;
            }
            throw AuthenticationError;
        },

        newDestination: async (parent, { tripId, location, when }, context) => {
            if (context.user) {
                const newDestination = await Destination.create({ location, when, trip: tripId });
                await Trip.findByIdAndUpdate(
                    { _id: tripId },
                    { $push: { destinations: newDestination._id } },
                    { new: true }
                );
                return newDestination;
            }
            throw AuthenticationError;
        }, 

        updateDestination: async (parent, { _id, location, when }, context) => {
            if (context.user) {
                const updatedDestination = await Destination.findByIdAndUpdate(
                    _id,
                    { location, when },
                    { new: true }
                );
                return updatedDestination;
            }
            throw AuthenticationError;
        },

        deleteDestination: async (parent, { _id }, context) => {
            if (context.user) {
                const deletedDestination = await Destination.findByIdAndDelete(_id);
                // remove the destination from the trip's destinations
                await Trip.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { destinations: _id } },
                    { new: true }
                );
                
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