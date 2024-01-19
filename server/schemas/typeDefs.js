const typeDefs = `
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        savedTrips: [Trip]
    }

    type Trip {
        _id: ID!
        city: String!
        when: Date!
        username: String!
        destinations: [Destination]
    }

    type Destination {
        _id: ID!
        location: String!
        when: Date!
        trip: String!
    }

    type Query {
        user: [User]
        trip: [Trip]
        destination: [Destination]
    }

    type Mutation {
        newUser(username: String!, email: String!, password: String!): Auth
        newTrip(city: String!, when: Date!, username: String!): Auth
        newDestination(location: String!, when: Date!, trip: String!): Auth
    }
`;

module.exports = typeDefs;