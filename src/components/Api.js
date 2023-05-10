export default class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    }).then(res => {
      return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  addNewCard({ name, link }) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ name, link })
    }).then(res => {
      return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  editUserInfo({ name, about }) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ name, about })
    }).then(res => {
      return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  editUserAvatar({ avatar }) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ avatar })
    }).then(res => {
      return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  getUserData() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    }).then(res => {
      return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  likeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    }).then(res => {
      return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  dislikeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    }).then(res => {
      return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    }).then(res => {
      return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
    });
  }
}
