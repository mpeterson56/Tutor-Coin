import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_TUTOR, QUERY_ME_TUTOR } from '../../utils/queries';
import Auth from '../../utils/auth';

const TutorProfile = (props) => {
    const { username: userParam } = useParams();

    const { loading, data } = useQuery(userParam ? QUERY_TUTOR : QUERY_ME_TUTOR, {
        variables: { username: userParam },
    });

    const user = data?.me || data?.user || {};

    // navigate to personal profile page if username is yours
    if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
        return <Navigate to="/tutorProfile:username" />;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user?.username) {
        return (
            <h4>
                You need to be logged in to see this. Use the navigation links above to
                sign up or log in!
            </h4>
        );
    }

    return (
        <div>
            <div>
                <h2>
                    Viewing {userParam ? `${user.username}'s` : 'your'} profile.
                </h2>
            </div>

            <div>
                <div>
                    {/* this will be swapped for BidList */}
                    {/* <ThoughtList
                    thoughts={user.thoughts}
                    title={`${user.username}'s thoughts...`}
                    /> */}
                </div>
            </div>
        </div>
    );
};

export default TutorProfile;