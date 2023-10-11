import { checkResponse } from './helpers';

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getUserInfo() {
    return fetch(this._baseUrl + '/users/me', {
      headers: this._headers,
    }).then(checkResponse);
  }

  setUserInfo({ name, about }) {
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(checkResponse);
  }

  setUserAvatar({ avatar }) {
    return fetch(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    }).then(checkResponse);
  }

  getInitialCards() {
    return fetch(this._baseUrl + '/cards', {
      headers: this._headers,
    }).then(checkResponse);
  }

  addCard({ name, link }) {
    return fetch(this._baseUrl + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(checkResponse);
  }

  deleteCard(cardId) {
    return fetch(this._baseUrl + '/cards/' + cardId, {
      method: 'DELETE',
      headers: this._headers,
    }).then(checkResponse);
  }

  changeCardLikeStatus(cardId, isLiked) {
    return fetch(this._baseUrl + '/cards/likes/' + cardId, {
      method: `${isLiked ? 'PUT' : 'DELETE'}`,
      headers: this._headers,
    }).then(checkResponse);
  }
}

const groupId = 'web_ptbr_04';
const token = '56988fc2-c072-4a64-b0a6-6eaae5ae8b3e';

const api = new Api({
  baseUrl: `https://around.nomoreparties.co/v1/${groupId}`,
  headers: {
    authorization: token,
    'Content-Type': 'application/json',
  },
});

export default api;
