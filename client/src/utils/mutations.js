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
  mutation newUser($username: String!, $email: String!, $password: String!) {
    newUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($_id: ID!, $username: String, $email: String, $password: String) {
    updateUser(_id: $_id, username: $username, email: $email, password: $password) {
      _id
      username
      email
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($_id: ID!) {
    deleteUser(_id: $_id) {
      _id
    }
  }
`;

export const NEW_TRIP = gql`
  mutation newTrip($city: String!, $start: String!, $end: String!) {
    newTrip(city: $city, start: $start, end: $end) {
      _id
      city
      start
      end
    }
  }
`;

export const UPDATE_TRIP = gql`
  mutation updateTrip($_id: ID!, $city: String, $start: String, $end: String) {
    updateTrip(_id: $_id, city: $city, start: $start, end: $end) {
      _id
      city
      start
      end
    }
  }
`;

export const DELETE_TRIP = gql`
  mutation deleteTrip($_id: ID!) {
    deleteTrip(_id: $_id) {
      _id
    }
  }
`;

export const NEW_DESTINATION = gql`
  mutation newDestination($tripId: ID!, $location: String!, $start: String!, $end: String!) {
    newDestination(tripId: $tripId, location: $location, start: $start, end: $end) {
      _id
      location
      start
      end
    }
  }
`;

export const UPDATE_DESTINATION = gql`
  mutation updateDestination($_id: ID!, $location: String, $start: String, $end: String) {
    updateDestination(_id: $_id, location: $location, start: $start, end: $end) {
      _id
      location
      start
      end
    }
  }
`;

export const DELETE_DESTINATION = gql`
  mutation deleteDestination($_id: ID!) {
    deleteDestination(_id: $_id) {
      _id
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation addFriend($userId: ID!, $friendId: ID!) {
    addFriend(userId: $userId, friendId: $friendId) {
      _id
      username
    }
  }
`;

export const DELETE_FRIEND = gql`
  mutation deleteFriend($friendId: ID!) {
    deleteFriend(friendId: $friendId) {
      _id
      username
    }
  }
`;