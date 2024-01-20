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
        when: String!
        destinations: [Destination]
    }

    type Destination {
        _id: ID!
        location: String!
        when: String!
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

    input newUserInput {
        username: String!
        email: String!
        password: String!
    }

    input newTripInput {
        city: String!
        when: String!
    }

    input newDestinationInput {
        location: String!
        when: String!
    }

    type Mutation {
        newUser(input: newUserInput): Auth
        updateUser(_id: ID!, username: String, email: String, password: String): User
        deleteUser(_id: ID!): User

        newTrip(input: newTripInput): Trip
        updateTrip(_id: ID!, city: String, when:String): Trip
        deleteTrip(_id: ID!): Trip

        newDestination(input: newDestinationInput): Destination
        updateDestination(_id: ID!, location: String, when:String): Destination
        deleteDestination(_id: ID!): Destination

        addFriend(userId: ID!, friendId: ID!): User
        deleteFriend(friendId: ID!): User
        
        login(email: String!, password: String!): Auth
    }
`;

module.exports = typeDefs;