import {gql} from '@apollo/client';

export const QUERY_ME = gql`
    query me {
        me {
            _id
            username
            email
            trips {
                _id
                city
                start
                end
                destinations {
                    _id
                    location
                    when
                }
            }
            friends {
                _id
                username
            }
        }
    }
`;

export const QUERY_USERS = gql`
    query users {
        users {
            _id
            username
            email
            trips {
                _id
                city
                start
                end
                destinations {
                    _id
                    location
                    when
                }
            }
            friends {
                _id
                username
            }
        }
    }
`;

export const QUERY_USER = gql`
    query user($username: String!) {
        user(username: $username) {
            _id
            username
            email
            trips {
                _id
                city
                start
                end
                destinations {
                    _id
                    location
                    when
                }
            }
            friends {
                _id
                username
            }
        }
    }
`;

export const QUERY_TRIPS = gql`
    query trips($username: String!) {
        trips(username: $username) {
            _id
            city
            start
            end
            destinations {
                _id
                location
                when
            }
        }
    }
`;

export const QUERY_TRIP = gql`
    query trip($id: ID!) {
        trip(_id: $id) {
            _id
            city
            start
            end
            destinations {
                _id
                location
                when
            }
        }
    }
`;

export const QUERY_DESTINATIONS = gql`
    query destinations($trip: String!) {
        destinations(trip: $trip) {
            _id
            location
            when
        }
    }
`;

export const QUERY_DESTINATION = gql`
    query destination($id: ID!) {
        destination(_id: $id) {
            _id
            location
            when
        }
    }
`;