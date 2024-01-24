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

export const ADD_USER = gql`
  mutation newUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
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
    mutation newTrip($city: String!, $start: String!, $end: String!) {
        newTrip(input: { city: $city, start: $start, end :$end }) {
            city
            start
            end
        }
    }
`;