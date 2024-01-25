import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const NEW_USER = gql`
  mutation newUser($input: newUserInput!) {
    newUser(input: $input) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const NEW_TRIP = gql`
    mutation newTrip($input: NewTripInput!) {
        newTrip(input: $input) {
            _id
            city
            start
            end
            username
        }
    }
`;