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

class App extends React.Component {
    constructor(props) {
        super(props);
        this.auth = new Auth(this.props.history);
    };

    render() {
        return(
            <>
                <Nav auth={this.auth} />

                <Route path='/' exact render={ props => <Home auth={this.auth} {...props} /> }/>
                <Route path='/public' component={Public} />
                <Route path='/callback' render={ props => <Callback auth={this.auth} {...props} /> }/>

                <PrivateRoute path='/profile' component={Profile} auth={this.auth}/>
                <PrivateRoute path='/private' component={Private} auth={this.auth} />
                <PrivateRoute path='/courses' component={Courses} auth={this.auth} scopes={["read:courses"]} />
            </>
        )
    };
}

export default App;
