// Import GraphQL error from graphql to handle errors
const { GraphQLError } = require('graphql');
// Import jsonwebtoken for jwt token creation
const jwt = require('jsonwebtoken');
// Import dotenv for environment variables
require('dotenv').config();

// Import the secret from the .env file
const secret = process.env.SECRET;
// If there is no secret, throw an error
if (!secret) {
    throw new Error('SECRET is not defined in the environment variables');
}
// Set the expiration time for the jwt token to 2 hours
const expiration = '2h';

module.exports = {
    // Create a new instance of GraphQLError with the message 'Unauthenticated'
    AuthenticationError: new GraphQLError('Unauthenticated', {
        extensions: {
            // Set the error code to UNAUTHENTICATED
            code: 'UNAUTHENTICATED'
        },
    }),

    authMiddleware: function ({ req}) {
        // allows the token to be sent via req.body, req.query, or headers
        let token = req.body.token || req.query.token || req.headers.authorization;
        
        // If there is header authorization, split the token string and return the token
        if (req.headers.authorization) {
            token = token.split(' ').pop().trim();
        }

        // If there is no token, return the request object as is
        if (!token) {
        return req;
        }

        try {
            // verify token and add user data to the request object
            const { data } = jwt.verify(token, secret);
            req.user = data;
            // If token is invalid, throw an error
        } catch {
            console.error('Invalid token');
        }

        // return the updated request object
        return req;
    },
    // Create a function that signs the token
    signToken: function ({ email, username, _id }) {
        const payload = { email, username, _id };

        // Sign the token with the payload, secret key, and expiration time
        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    },
};