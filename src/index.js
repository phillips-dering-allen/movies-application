/* IMPORTS */
import * as key from './keys';
import * as view from './views';

const {getMovies, postMovie, getMovieInfo} = require('./api.js');


const state = {
  flipped: false,
}

// Adds new card to the screen without refreshing
const update = (movie) => {
  const newCard = view.renderMovie(movie);
  $('#movie-box').append(newCard);
}

// Initial load
const init = () => {
  getMovies()
      .then(movies => {
        view.renderMovies(movies);
      })
      .catch(error => alert(error));
};
init();

/* Event Listeners */
$('#movie-box').on("click","#movie-submit",((e) => {
  e.preventDefault();

  const movie = {
    title: $('#movie-title').val(),
    description: $('#movie-description').val(),
    rating: $('input[name="rating"]').val()
  }

  console.log(movie);

  fetch(`http://www.omdbapi.com/?apikey=${key.openMovieDB}&t=${movie.title}`)
      .then(result => result.json())
      .then(data => {
        console.log(data);
        movie.poster = data.Poster
        if(movie.description.length === 0)
          movie.description = data.Plot;
        postMovie(movie)
            .then((response) => response.json())
            .then((movie) => update(movie));
      });
}));

// $('.add-button').on('click', '', (e) => {
//
// })

$('#movie-box').on('click','.movie-card', (e) => {
  if(!state.flipped) {
    state.currentlyFlipped = e.currentTarget.children[0];
    state.currentlyFlipped.classList.toggle('flip');
    state.flipped = true;
  } else {
    if(e.target.classList.value.includes('top-left')) {
      state.currentlyFlipped.classList.toggle('flip');
      state.flipped = false;
    } else {
      state.currentlyFlipped.classList.toggle('flip');
      state.currentlyFlipped = e.currentTarget.children[0];
      state.currentlyFlipped.classList.toggle('flip');
    }
  }
});

$('#movie-box').on('click','.top-right', (e) => {
  state.edit = true;
  let dataID = e.currentTarget.parentNode.parentNode.parentNode.parentNode.getAttribute('data-id')
  console.log(dataID);
  console.log(e.currentTarget);

});

$('#movie-box').on('hover','#card-add', () => {
  console.log("HOVER");
});

// Hover Effect

// Stars rating
// $('.rating label i').click((e) => {
//     const attr = e.currentTarget.parentNode.getAttribute('for');
//     // console.log($("#" + attr).siblings("input"));
//     console.log(attr);
// });