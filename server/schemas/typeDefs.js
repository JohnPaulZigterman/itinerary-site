const typeDefs = `
    type User {
        _id: ID!
        username: String!
        email: String!
        trips: [Trip]
        friends: [User]
    }

    type Trip {
        _id: ID!
        city: String!
        start: String!
        end: String!
        user: User
        destinations: [Destination]
    }

    type Destination {
        _id: ID!
        location: String!
        when: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        users: [User]
        user(username: String!): User
        trips(username: String!): [Trip]
        trip(_id: ID!): Trip
        destinations(trip: String!): [Destination]
        destination(_id: ID!): Destination
        me: User
    }

    type Mutation {
        newUser(username: String!, email: String!, password: String!): Auth
        updateUser(_id: ID!, username: String, email: String, password: String): User
        deleteUser(_id: ID!): User

        newTrip(city: String!, start: String!, end: String!): Trip
        updateTrip(_id: ID!, city: String, start: String, end: String): Trip
        deleteTrip(_id: ID!): Trip

        newDestination(tripId: ID!, location: String!, when: String): Destination
        updateDestination(_id: ID!, location: String, when: String): Destination
        deleteDestination(_id: ID!): Destination

        addFriend(userId: ID!, friendId: ID!): User
        deleteFriend(friendId: ID!): User
        
        login(email: String!, password: String!): Auth
    }
`;

module.exports = typeDefs;