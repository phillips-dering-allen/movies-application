/* IMPORTS */
import * as key from './keys';
import * as view from './views';
import {renderMovies} from "./views";

const {getMovies, postMovie, getMovie, patchMovie, deleteMovie} = require('./api.js');


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
            state.movies = movies;
            console.log(state.movies);
            view.renderMovies(movies);
        })
        .catch(error => alert(error));
};
init();

/* Event Listeners */
$('#movie-box').on('click', '.movie-card', (e) => {
    if (!state.flipped) {
        state.currentlyFlipped = e.currentTarget.children[0];
        state.currentlyFlipped.classList.toggle('flip');
        state.flipped = true;
    } else {
        if (e.target.classList.value.includes('top-left')) {
            state.currentlyFlipped.classList.toggle('flip');
            state.flipped = false;
        } else {
            state.currentlyFlipped.classList.toggle('flip');
            state.currentlyFlipped = e.currentTarget.children[0];
            state.currentlyFlipped.classList.toggle('flip');
        }
    }
});

$('#movie-box').on('click', '.top-right', (e) => {
    state.edit = true;
    let dataID = e.currentTarget.parentNode.parentNode.parentNode.parentNode.getAttribute('data-id')
    view.toggleInputForm(state.edit);
    view.toggleImageHide();
    view.renderLoader();
    $('#modal-form').modal('show');
    getMovie(dataID).then((movie) => {
        $('.sk-cube-grid').remove();
        view.toggleImageHide();
        $('input[type="hidden"]').attr("data-id",movie.id);
        $('#form-movie-title').parent().next().val(movie.title);
        $('#form-movie-director').parent().next().val(movie.director);
        $('#form-movie-description').parent().next().val(movie.description);
        // Rating
        $('#form-movie-url').parent().next().val(movie.poster);
        $('#form-movie-image').attr('src',`${movie.poster}`);

        if(movie.genre) {
            $('input[type="checkbox"]').each((i,e) => {
                if(movie.genre.indexOf(e.value) !== -1)
                    $(e).prop("checked", true);
            });
        }
    });

});

$('#modal-form').on('click', '#trash', () => {
    state.edit = false;
    deleteMovie($('input[type="hidden"]').attr("data-id")).then();
    view.toggleInputForm();
    $('#form-movie-image').attr("src","https://m.media-amazon.com/images/M/MV5BMTkxNDc3OTcxMV5BMl5BanBnXkFtZTgwODk2NjAzOTE@._V1_SX300.jpg");
    view.removeMovie($('input[type="hidden"]').attr("data-id"));
    view.clearInput();
    $('#modal-form').modal('hide');
});

$('#form-close').click(() => {
    state.edit = false;
    view.toggleInputForm();
    $('#form-movie-image').attr("src","https://m.media-amazon.com/images/M/MV5BMTkxNDc3OTcxMV5BMl5BanBnXkFtZTgwODk2NjAzOTE@._V1_SX300.jpg");
    view.clearInput();
    $('#modal-form').modal('hide');
})

$('#input-submit').click((e) => {
    e.preventDefault();
    // Variables
    const movie = {
        title: $('#form-movie-title').parent().next().val(),
        director: $('#form-movie-director').parent().next().val(),
        description: $('#form-movie-description').parent().next().val(),
        rating: $('#form-rating input[type="radio"]:checked').val(),
        poster: $('#form-movie-url').parent().next().val(),
        genre: []
    }

    console.log(movie.title);

    $('input[type="checkbox"]:checked').each((i, e) => {
        movie.genre.push(e.value);
    });

    const rating = {
        fake: [5, 4, 3, 2, 1],
        real: [1, 2, 3, 4, 5]
    }

    movie.rating = parseFloat($('#form-rating input[type="radio"]:checked').val());
    movie.rating = rating.real[rating.fake.indexOf(movie.rating)];
    if (movie.title.length !== 0) {
        if (state.edit) {
            state.edit = false;
            patchMovie(movie, $('input[type="hidden"]').attr("data-id")).then(result => result.json()).then(data => console.log(data));
            view.toggleInputForm();
            $('#form-movie-image').attr("src","https://m.media-amazon.com/images/M/MV5BMTkxNDc3OTcxMV5BMl5BanBnXkFtZTgwODk2NjAzOTE@._V1_SX300.jpg");
        } else {
            fetch(`http://www.omdbapi.com/?apikey=${key.openMovieDB}&t=${movie.title}`)
                .then(result => result.json())
                .then(data => {
                    console.log(data);
                    movie.poster = data.Poster
                    if (movie.description.length === 0)
                        movie.description = data.Plot;
                    if (movie.director.length === 0)
                        movie.director = data.Director;
                    if (movie.genre.length === 0 && data.Genre)
                        movie.genre = data.Genre.split(', ');
                    postMovie(movie)
                        .then((response) => response.json())
                        .then((movie) => update(movie));
                });
        }

        view.clearInput();
        $('#modal-form').modal('hide');
    } else {
        alert("Please enter a title");
    }
});

$("#search-input").keyup(() => {
    const search = $('#search-input').val().toLowerCase();
    const bucket = [];
    state.movies.forEach(movie => {
        for(const key in movie) {
            console.log(key);
            if(movie[key]) {
                if(Array.isArray(movie[key])) {
                    const string = movie[key].join(' ').toLowerCase();
                    if(string.includes(search)) {
                        bucket.push(movie);
                        break;
                    }
                } else if(typeof movie[key] === "number") {
                    console.log("NUMBER");
                } else {
                    if(movie[key].toLowerCase().includes(search)) {
                        bucket.push(movie);
                        break;
                    }
                }
            }
        }
    });
    console.log(bucket);

    renderMovies(bucket);
});

// $('#form-rating input[type="radio"]').click((e) => {
//   e.target.classList.toggle('gold');
//   console.log(e.target.);
// });

// Hover Effect

// Stars rating
// $('.rating label i').click((e) => {
//     const attr = e.currentTarget.parentNode.getAttribute('for');
//     // console.log($("#" + attr).siblings("input"));
//     console.log(attr);
// });