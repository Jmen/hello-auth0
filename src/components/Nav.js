import React from 'react';
import { Link } from 'react-router-dom';

const Nav = (props) => {

    const { auth } = props;

    console.log(props);

    return (
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/public">Public</Link></li>

            {
                (auth.isLoggedIn()) ?
                    <li><button onClick={auth.logout}>logout</button></li> :
                    <li><button onClick={auth.login}>login</button></li>

            }
        </ul>
    );
};

export default Nav;