import { checkResponse } from './helpers';

class Auth {
  constructor(baseUrl, headers) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  register(email, password) {
    return fetch(this._baseUrl + '/signup', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        email,
        password,
      }),
    }).then(checkResponse);
  }

  login(email, password) {
    return fetch(this._baseUrl + '/signin', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then(checkResponse)
      .then((data) => {
        localStorage.setItem('jwt', data.token);
        return data.token;
      });
  }

  authorize(token) {
    return fetch(this._baseUrl + '/users/me', {
      method: 'GET',
      headers: { ...this._headers, Authorization: `${token}` },
    }).then(checkResponse);
  }
}

const auth = new Auth('https://api-aroundtheus.anynoise.dev', {
  'Content-Type': 'application/json',
});

export default auth;
