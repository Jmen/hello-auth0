import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Home from "./components/Home";
import Profile from "./components/Profile";
import Nav from "./components/Nav";
import Auth from "./auth/Auth";
import Callback from "./components/Callback";
import Public from "./components/Public";
import Private from "./components/Private";

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

                <Route path='/callback' render={ props => <Callback auth={this.auth} {...props} /> }/>

                <Route path='/profile' render={ props =>
                    (this.auth.isLoggedIn()) ?
                        <Profile auth={this.auth} {...props} /> :
                        <Redirect to='/'/>
                }/>

                <Route path='/public' component={Public} />
                <Route path='/private' render={props => <Private auth={this.auth} {...props} /> }/>
            </>
        )
    };
}

export default App;
