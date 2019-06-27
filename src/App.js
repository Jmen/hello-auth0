import React from 'react';
import { Route } from 'react-router-dom';
import Home from "./components/Home";
import Profile from "./components/Profile";
import Nav from "./components/Nav";
import Auth from "./auth/Auth";
import Callback from "./components/Callback";
import Public from "./components/Public";
import Private from "./components/Private";
import Courses from "./components/Courses";
import PrivateRoute from "./components/PrivateRoute";
import AuthContext from "./auth/AuthContext";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            auth: new Auth(this.props.history)
        };
    };

    render() {
        return(
            <AuthContext.Provider value={this.state.auth}>

                <Nav />

                <Route path='/' exact render={ props => <Home {...props} /> }/>
                <Route path='/public' component={Public} />
                <Route path='/callback' render={ props => <Callback auth={this.state.auth} {...props} /> }/>

                <PrivateRoute path='/profile' component={Profile} />
                <PrivateRoute path='/private' component={Private} />
                <PrivateRoute path='/courses' component={Courses} scopes={["read:courses"]} />

            </AuthContext.Provider>
        )
    };
}

export default App;
