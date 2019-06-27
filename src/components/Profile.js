import React, { Component } from 'react';

class Profile extends Component {

    state = {
        profile: null,
        error: ''
    };

    componentDidMount() {
        this.loadUserProfile();
    }

    loadUserProfile() {
        return this.props.auth.getUserProfile( (profile, error) => {
            this.setState({ profile, error });
        } );
    }

    render() {
        return (
            <>
                <h1>Profile</h1>
                <pre>{JSON.stringify(this.state.profile, null, 2)}</pre>
            </>
        );
    }
}

export default Profile;