/* es6 modules and imports */
import * as key from './keys';
import * as view from './views';


/* require style imports */
const {getMovies, getMovie, getMovieInfo, postMovie} = require('./api.js');

const state = {}

const init = () => {
  // Render the Loader
  view.renderLoader();

  // Get the Movies from the DB
  getMovies().then(movies => {
    // Store the length
    state.length = movies.length;

    // Render the movies
    view.renderMovies(movies);
  }).catch(error => {
    alert('Oh no! Something went wrong.\nCheck the console for details.')
    console.log(error);
  });

  //postMovie("The Bourne Identity", 5, state.length);
  // fetch(`http://www.omdbapi.com/?apikey=${key.openMovieDB}&t=lion+king`).then(response => response.json()).then(data => console.log(data));
};
init();


/* Event Listeners */
$('#movie-submit').click((e) => {
  e.preventDefault();
  let movie = {
    title: $('#movie-title').val(),
    rating: $('#movie-description').val(),
    description: $('input[name="rating"]').val(),
    id: state.length + 1,
  }

  // getMovieInfo(key.openMovieDB, movie)
  //     .then(() => {
  //       postMovie(key.openMovieDB, movie).then();
  //       view.clearInput();
  //       init();
  //     })
  //     .catch(error => {
  //       console.log("IT FAILED");
  //       movie.poster = "https://m.media-amazon.com/images/M/MV5BMTkxNDc3OTcxMV5BMl5BanBnXkFtZTgwODk2NjAzOTE@._V1_SX300.jpg";
  //     });

  // console.log(movie.title);
  // console.log(movie.description);
  // console.log(movie.rating);
  // postMovie(key.openMovieDB, movie.title, movie.description, movie.rating, state.length).then();
  // view.clearInput();
  // init();
});


// $('.add').click((e) => {
//   e.preventDefault();
//   const addMovie = {
//
//   }
// })


// Stars rating
$('.rating label i').click((e) => {
  const attr = e.currentTarget.parentNode.getAttribute('for');
  console.log($("#" + attr).siblings("input"));
  //
  // console.log(e.currentTarget.parentNode)
});