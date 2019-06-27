import React from 'react';
import { Link } from 'react-router-dom';
import AuthContext from "../auth/AuthContext";

const Nav = () => {
    return (
        <AuthContext.Consumer>
            { auth => (
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/public">Public</Link></li>
                    <li><Link to="/private">Private</Link></li>
                    <li><Link to="/courses">Courses</Link></li>
                    {
                        (auth.isLoggedIn()) ?
                            <li><button onClick={auth.logout}>logout</button></li> :
                            <li><button onClick={auth.login}>login</button></li>

                    }
                </ul>
            )}
        </AuthContext.Consumer>
    );
};

export default Nav;