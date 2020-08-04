/**
 * es6 modules and imports
 */
import * as key from './keys';
import * as view from './views';

/**
 * require style imports
 */
const {getMovies, getMovie, postMovie} = require('./api.js');

const state = {}

const init = () => {
  console.log("Init");
  view.renderLoader();


  getMovies().then((movies) => {
    console.log(movies)
    state.length = movies.length;
    // console.log('Here are all the movies:');
    // movies.forEach(({title, rating, id}) => {
    //   console.log(`id#${id} - ${title} - rating: ${rating}`);
    // });
    view.renderMovies(movies);
  }).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.')
    console.log(error);
  });

  getMovie(2).then((movie) => console.log(movie));
  //postMovie("The Bourne Identity", 5, state.length);
  console.log("END");

  // fetch(`http://www.omdbapi.com/?apikey=${key.openMovieDB}&t=lion+king`).then(response => response.json()).then(data => console.log(data));
}

init();

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
