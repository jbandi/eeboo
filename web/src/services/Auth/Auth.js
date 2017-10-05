import auth0 from 'auth0-js';

import history from '../history';

export default class Auth {
  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.authFetch = this.authFetch.bind(this);
    this.checkStatus = this.checkStatus.bind(this);
  }

  // construct redirection uri according to environment variables
  constructUri = () => (
    (process.env.REACT_APP_DOMAIN && process.env.REACT_APP_PORT)
      ? `https://${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_PORT}/callback`
      : 'http://localhost:3000/callback'
  )

  userProfile;
  requestedScopes = 'openid profile openid read:messages';

  auth0 = new auth0.WebAuth({
    domain: 'eeboo.eu.auth0.com',
    clientID: 'i0DIt1tg8naYapZb730lh7bpxqv3Gkk1',
    redirectUri: this.constructUri(),
    audience: 'https://eboo.herokuapp.com',
    responseType: 'token id_token',
    scope: this.requestedScopes,
  });

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        history.replace('/admin');
      } else if (err) {
        history.replace('/');
      }
    });
  }

  setSession(authResult) {
    const scopes = authResult.scope || this.requestedScopes || '';
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('scopes', JSON.stringify(scopes));
    localStorage.setItem('roles', authResult.idTokenPayload['https://eeboo.ch/authorization'].roles);
    localStorage.setItem('permissions', authResult.idTokenPayload['https://eeboo.ch/authorization'].permissions);
    // history.replace('/admin');
  }

  login() {
    this.auth0.authorize();
  }

  logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('scopes');
    localStorage.removeItem('roles');
    localStorage.removeItem('permissions');
    history.replace('/');
  }

  isAuthenticated = () => {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  getAccessToken = () => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('No access token found');
    }
    return accessToken;
  }

  getProfile(cb) {
    const accessToken = this.getAccessToken();
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        this.userProfile = profile;
      }
      cb(err, profile);
    });
  }

  userHasScopes = (scopes) => {
    const grantedScopes = JSON.parse(localStorage.getItem('scopes')).split(' ');
    return scopes.every(scope => grantedScopes.includes(scope));
  }

  userHasRoles = (roles) => {
    const grantedScopes = localStorage.getItem('roles').split(',');
    return roles.every(role => grantedScopes.includes(role));
  }

  authFetch(url, options) {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    if (this.isAuthenticated()) {
      headers.Authorization = `Bearer ${this.getAccessToken()}`;
    }

    return fetch(url, { headers, ...options })
      .then(this.checkStatus)
      .then(response => response.json());
  }

  checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}
