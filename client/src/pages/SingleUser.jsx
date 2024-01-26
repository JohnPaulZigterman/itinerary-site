import React  from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import User from '../components/UI/User';
import { QUERY_USER } from '../utils/queries'; 

export default function SingleUser() {
    let { username } = useParams();

    const { loading, data } = useQuery(QUERY_USER, {
        variables: { username: username },
    });

    const userData = data?.user;

    if (userData) {
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className='single-trip'>

                {userData && (
                    <User 
                        username={userData.username}
                        trips={userData.trips}
                    />
                )}
            </div>
        </div>

    );
    
}