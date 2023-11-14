class Api {
  constructor(options) {
    this._options = options;
    this._authorization = options.headers.authorization;
    this._contentType = options.headers.ContentType;
  }

  getAppInfo() {
    return Promise.all([this.getInitialCardsMovie(), this.getUserInfo()]);
  }

  getInitialCardsMovie() {
    return fetch(`${this._options.baseUrl }/movies`, {
      headers: {
        authorization: `Bearer ${localStorage.jwt}`,
        "Content-Type": this._contentType,
      },
    }).then((res) => this._checkResStatus(res));
  }

  createCardMovie(data) {
    return fetch(`${this._options.baseUrl}/movies`, {
      method: "POST",
      headers: {
        authorization: this._authorization,
        "Content-Type": this._contentType,
      },
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: data.image,
        trailerLink: data.trailerLink,
        thumbnail: data.thumbnail,
        movieId: data.movieId,
        nameRU: data.nameRU,
        nameEN:data.nameEN 
      }),
    }).then((res) => this._checkResStatus(res));
  }

  getUserInfo() {
    return fetch(`${this._options.baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${localStorage.jwt}`,
        "Content-Type": this._contentType,
      },
    }).then((res) => this._checkResStatus(res));
  }

  updateUserInfo(data) {
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._authorization,
        "Content-Type": this._contentType,
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      }),
    }).then((res) => this._checkResStatus(res));
  }

  deleteMovie(id) {
    return fetch(`${this._options.baseUrl}/movies/${id}`, {
      method: "DELETE",
      headers: {
        authorization: this._authorization,
        "Content-Type": this._contentType,
      },
    }).then((res) => this._checkResStatus(res));
  }

  _checkResStatus(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка ${res.status}`);
    }
  }
}

const api = new Api({
  baseUrl: "https://api.movies.hh.nomoredomainsrocks.ru",
  headers: {
    authorization: `Bearer ${localStorage.jwt}`,
    ContentType: "application/json",
  },
});

export default api;
