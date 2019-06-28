import React, { useState, useEffect } from 'react';

const Profile = ({ auth }) => {

    const [profile, setProfile] = useState(null);

    useEffect(() => {
        if (!profile) {
            auth.getUserProfile((profile, error) => {
                if (!error) {
                    setProfile(profile);
                }
            });
        }
    });

    return (
        <>
            <h1>Profile</h1>
            <pre>{JSON.stringify(profile, null, 2)}</pre>
        </>
    );
};

export default Profile;