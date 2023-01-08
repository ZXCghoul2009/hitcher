import Keycloak from "keycloak-js";

export const kc = new Keycloak('/keycloak.json');

const initKeycloak = (onAuthenticatedCallback:any) => {
  kc.init({
    onLoad: 'check-sso',
    //todo silentCheckSsoRedirectUri not working with some browsers
    /// silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
    pkceMethod: 'S256',
  })
      .then((authenticated) => {
        if (!authenticated) {
          console.log("user is not authenticated..!");
        }
        onAuthenticatedCallback();
      })
      .catch(console.error);
};

const doLogin = kc.login;

const doLogout = kc.logout;

const getToken = () => kc.token;

const isLoggedIn = () => !!kc.token;

const updateToken = (successCallback:any) =>
    kc.updateToken(5)
        .then(successCallback)
        .catch(doLogin);

const getUsername = () => kc.tokenParsed?.preferred_username;

const UserService = {
  initKeycloak,
  doLogin,
  doLogout,
  isLoggedIn,
  getToken,
  updateToken,
  getUsername,
};


export default UserService;