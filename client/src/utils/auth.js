import decode from 'jwt-decode';

class AuthService {
  
  // get logged in user info
  getProfile() {
    // decodes jwt to get the user info
    return decode(this.getToken());
  }
  
  // check if user is logged in
  loggedIn() {
    const token = this.getToken(); // retrieve token from local storage
    // check if the user is logged in: return `true` if token exists and isn't expired
    return token && !this.isTokenExpired(token) ? true : false;
  }

  // check if the token has expired
  isTokenExpired(token) {
    // decode jwt to check expiration time
    const decoded = decode(token);
    // if expiration time is less than the current time (in seconds), the token is expired and we return `true`
    if (decoded.exp < Date.now() / 1000) {
      // remove expired token from local storage and return true
      localStorage.removeItem('id_token');
      return true;
    }
    // if token isn't expired, return false
    return false;
  }

  // retrieve the token from local storage
  getToken() {
    return localStorage.getItem('id_token'); 
  }

  login(idToken) {
    // store the given token in local storage
    // redirect the user to the home page after login
    localStorage.setItem('id_token', idToken); 
    window.location.assign('/'); 
  }

  // remove the token from local storage to log out the user
  // reload the page to reflect the logout state.
  logout() {
    localStorage.removeItem('id_token'); 
    window.location.reload();
  }

}

export default new AuthService(); 