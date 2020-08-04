module.exports = {
  getMovies: () => {
    return fetch('/api/movies')
        .then(response => response.json());
  },
  getMovie: (id) => {
    return fetch(`/api/movies/${id}`)
        .then(response => response.json());
  },
  postMovie: (title, rating, id) => {
    const movie = {
      title,
      rating,
      id: id + 1
    }
    return fetch(`/api/movies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(movie)
    }).then().catch(error => console.log(error));
  },
};
