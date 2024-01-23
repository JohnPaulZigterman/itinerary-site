import { gql } from '@apollo/client';

export const NEW_TRIP = gql`
    mutation newTrip($city: String!, $when: String!) {
        newTrip(input: { city: $city, when: $when }) {
            city
            when
        }
    }
`;