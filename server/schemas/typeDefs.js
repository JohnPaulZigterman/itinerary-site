const typeDefs = `
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        friends: [User]
    }

    type Trip {
        _id: ID!
        city: String!
        when: String!
        destinations: [Destination]
    }

    type Destination {
        _id: ID!
        location: String!
        when: String!
        trip: Trip!
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
        newTrip(city: String!, when: String!, username: String!): Trip
        updateTrip(_id: ID!, city: String, when: String): Trip
        deleteTrip(_id: ID!): Trip
        newDestination(location: String!, when: String!, trip: String!): Destination
        updateDestination(_id: ID!, location: String, when: String): Destination
        deleteDestination(_id: ID!): Destination
        addFriend(friendId: ID!): User
        deleteFriend(friendId: ID!): User
        login(email: String!, password: String!): Auth
    }
`;

module.exports = typeDefs;