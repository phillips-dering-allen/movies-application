module.exports = {
  getMovies: () => {
    return fetch('/api/movies')
        .then(response => response.json());
  },
  getMovie: (id) => {
    return fetch(`/api/movies/${id}`)
        .then(response => response.json());
  },
   getMovieInfo: (key, movie) => {
    fetch(`http://www.omdbapi.com/?apikey=${key}&t=${title}`)
        .then(response => response.json())
        .then(data => movie.poster = data.Poster)
        .catch(error => {
          console.log("IT FAILED");
          movie.poster =  "https://m.media-amazon.com/images/M/MV5BMTkxNDc3OTcxMV5BMl5BanBnXkFtZTgwODk2NjAzOTE@._V1_SX300.jpg"
    });
  },
  postMovie: (key, movie) => {
    return fetch(`/api/movies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(movie)
    }).then().catch(error => console.log(error));
  },
};
