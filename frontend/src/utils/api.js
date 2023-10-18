import { checkResponse, getAuthorization } from './helpers';

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getUserInfo() {
    return fetch(this._baseUrl + '/users/me', {
      headers: {
        ...this._headers,
        Authorization: getAuthorization(),
      },
    }).then(checkResponse);
  }

  setUserInfo({ name, about }) {
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: {
        ...this._headers,
        Authorization: getAuthorization(),
      },
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(checkResponse);
  }

  setUserAvatar({ avatar }) {
    return fetch(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: {
        ...this._headers,
        Authorization: getAuthorization(),
      },
      body: JSON.stringify({
        avatar,
      }),
    }).then(checkResponse);
  }

  getInitialCards() {
    return fetch(this._baseUrl + '/cards', {
      headers: {
        ...this._headers,
        Authorization: getAuthorization(),
      },
    }).then(checkResponse);
  }

  addCard({ name, link }) {
    return fetch(this._baseUrl + '/cards', {
      method: 'POST',
      headers: {
        ...this._headers,
        Authorization: getAuthorization(),
      },
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(checkResponse);
  }

  deleteCard(cardId) {
    return fetch(this._baseUrl + '/cards/' + cardId, {
      method: 'DELETE',
      headers: {
        ...this._headers,
        Authorization: getAuthorization(),
      },
    }).then(checkResponse);
  }

  changeCardLikeStatus(cardId, isLiked) {
    return fetch(this._baseUrl + `/cards/${cardId}/likes`, {
      method: `${isLiked ? 'PUT' : 'DELETE'}`,
      headers: {
        ...this._headers,
        Authorization: getAuthorization(),
      },
    }).then(checkResponse);
  }
}

const api = new Api({
  baseUrl: `https://api.aroundus.mooo.com`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
