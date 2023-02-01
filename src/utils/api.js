class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _fetch(link, newMethod = "GET", newBody) {
    return fetch(this._url + link, {
      method: newMethod,
      headers: this._headers,
      body: JSON.stringify(newBody),
    }).then(this._checkRes);
  }

  _checkRes(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInfoProfile() {
    return this._fetch("/users/me");
  }

  infoProfileEdit(data) {
    return this._fetch("/users/me", "PATCH", data);
  }

  setAvatar(data) {
    return this._fetch(`/users/me/avatar`, `PATCH`, data);
  }

  getInitialCards() {
    return this._fetch("/cards");
  }

  postedCard(data) {
    return this._fetch(`/cards`, "POST", data);
  }

  deleteCard(id) {
    return this._fetch(`/cards/${id}`, "DELETE");
  }

  toggleLike(id, isLiked) {
    if(isLiked) {
      return (this.likeInactive(id))
    } else {
      return this.likeActive(id)
    }
  }

  likeActive(id) {
    return this._fetch(`/cards/${id}/likes`, "PUT");
  }

  likeInactive(id) {
    return this._fetch(`/cards/${id}/likes`, "DELETE");
  }
}

export const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-54",
  headers: {
    authorization: "b47db11d-0dc8-484e-a4c6-bb7d19733a74",
    "content-type": "application/json",
  },
});
