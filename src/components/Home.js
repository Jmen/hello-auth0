import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Home extends Component {
    render() {

        const { auth } = this.props;

        return (
            <React.Fragment>
                Home
                {
                    (auth.isLoggedIn()) ? (
                        <Link to='/profile' >Profile</Link> ) : (
                        <button onClick={auth.login}>login</button>
                    )
                }
            </React.Fragment>
        );
    }
}

export default Home;