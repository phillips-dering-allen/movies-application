/* es6 modules and imports */
import * as key from './keys';
import * as view from './views';

/* require style imports */
const {getMovies, getMovie, postMovie} = require('./api.js');

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
  const movie = {
    title: $('#movie-title').val(),
    rating: $('#movie-rating').val()
  }
  postMovie(movie.title, movie.rating).then();
  view.clearInput();
  init();
});


// $('.add').click((e) => {
//   e.preventDefault();
//   const addMovie = {
//
//   }
// })


// Adding
