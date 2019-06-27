import auth0 from 'auth0-js';

export default class Auth {
    constructor(history) {
        this.history = history;

        this.requestedScopes = "openid profile email read:courses";

        this.auth0 = new auth0.WebAuth({
            domain: process.env.REACT_APP_AUTH0_DOMAIN,
            clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
            redirect_uri: process.env.REACT_APP_AUTH0_REDIRECT_URI,
            audience: process.env.REACT_APP_AUTH0_AUDIENCE,
            // token = access token - OAuth 2.0
            // id_token = identity token - OpenID connect
            responseType: "token id_token",
            scope: this.requestedScopes
        });
    }

    login = () => {
      this.auth0.authorize(); // redirects to auth0 login page
    };

    handleAuthentication = () => {
        this.auth0.parseHash((error, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult);
            } else if (error) {
                alert(`error ${error}`)
            }

            this.history.push('/');
        });
    };

    setSession = (authResult) => {
        const expiresAt = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime());

        const scopes = authResult.scope || this.requestedScopes || "";

        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expiresAt', expiresAt);
        localStorage.setItem('scopes', JSON.stringify(scopes));
    };

    isLoggedIn = () => {
        const expiresAt = JSON.parse(localStorage.getItem("expiresAt"))
        return new Date().getTime() < expiresAt;
    };

    logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expiresAt');
        localStorage.removeItem('scopes');

        this.auth0.logout({
            clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
            returnTo: "http://localhost:3000"
        });
    };

    getAccessToken = () => {
      const accessToken = localStorage.getItem('access_token');

      if (!accessToken) {
          throw new Error("No access token found");
      }

      return accessToken;
    };

    getUserProfile = (callback) => {
        this.auth0.client.userInfo(this.getAccessToken(), (error, profile) => {
            callback(profile, error);
        });
    };

    userHasAllScopes = (scopes) => {

        const grantedScopes = (JSON.parse(localStorage.getItem('scopes'))).split(' ');

        return scopes.every((scope) => { return grantedScopes.includes(scope) });
    };
};