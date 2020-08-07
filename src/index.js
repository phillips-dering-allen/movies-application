/* Imports */
import * as key from './keys';
import * as view from './views';
import {elements} from './elements';
import * as helper from './helpers';

const {getMovies, getMovie, postMovie, patchMovie, deleteMovie} = require('./api.js');

const state = {
    currentlyFlipped: false,
}

const init = () => {
    getMovies()
        .then(movies => {
            $(".sk-cube-grid").remove();
            state.movies = movies;
            view.renderMovies(state.movies);
        }).catch(error => console.log(error));
}
init();

const updateCards = (movie) => {
    let currentID = movie.id, exists = false;
    for(let i=0; i<state.movies.length; i++) {
        if(state.movies[i].id == currentID) {
            exists = true;
            break;
        }
    }
    if (exists) {
        const movieCard = view.renderMovie(movie);
        $(`div[data-id="${movie.id}"]`).replaceWith(movieCard);
        // $(`div[data-id="${movie.id}"]`).children('div.movie-card-inner').addClass('flip');
    } else {
        state.movies.push(movie);
        const movieCard = view.renderMovie(movie);
        elements.movieBox.append(movieCard);
    }
}

/* Event Listeners */
elements.movieBox.on('click', '.movie-card', (e) => {
    if (!state.currentlyFlipped) {
        state.activeCard = e.currentTarget.children[0];
        state.activeCard.classList.toggle('flip');
        state.currentlyFlipped = true;
    } else {
        if (e.target.classList.value.includes('top-left')) {
            state.activeCard.classList.toggle('flip');
            state.currentlyFlipped = false;
        } else {
            state.activeCard.classList.toggle('flip');
            state.activeCard = e.currentTarget.children[0];
            state.activeCard.classList.toggle('flip');
        }
    }
});

elements.movieBox.on('click', '.top-right', (e) => {
    state.edit = true;
    const id = e.currentTarget.parentNode.parentNode.parentNode.parentNode.getAttribute('data-id');

    view.toggleInputForm(state.edit);
    view.toggleImage();
    view.renderLoader();

    elements.modal.modal('show');
    getMovie(id).then((movie) => {
        $('.sk-cube-grid').remove();
        view.toggleImage();
        helper.setFormData(elements.inputForm, movie);
    });
});

elements.modal.on('click', '#trash', () => {
    const id = elements.inputForm.id.attr("data-id");
    state.edit = false;
    elements.modal.modal('hide');
    const newMovies = []
    for (let i = 0; i < state.movies.length; i++) {
        if (state.movies[i].id != id) {
            newMovies.push(state.movies[i]);
        }
    }
    state.movies = newMovies;
    deleteMovie(id).then();
    view.toggleInputForm();
    view.removeMovie(id);
    view.clearInput(elements.inputForm);
    elements.inputForm.image.attr("src", "https://m.media-amazon.com/images/M/MV5BMTkxNDc3OTcxMV5BMl5BanBnXkFtZTgwODk2NjAzOTE@._V1_SX300.jpg");
});

elements.inputForm.exit.click(() => {
    state.edit = false;
    elements.modal.modal('hide');
    // Time out?
    view.toggleInputForm();
    view.clearInput(elements.inputForm);
    elements.inputForm.image.attr("src", "https://m.media-amazon.com/images/M/MV5BMTkxNDc3OTcxMV5BMl5BanBnXkFtZTgwODk2NjAzOTE@._V1_SX300.jpg");
});

elements.inputForm.submit.click((e) => {
    e.preventDefault();
    const rating = {
        fake: [5, 4, 3, 2, 1],
        real: [1, 2, 3, 4, 5]
    }
    const movie = helper.getFormData(elements.inputForm);

    $('input[type="checkbox"]:checked').each((i, e) => {
        movie.genre.push(e.value);
    });

    // Translate Fake Rating Into Real Rating
    movie.rating = parseFloat($('#form-rating input[type="radio"]:checked').val());
    movie.rating = rating.real[rating.fake.indexOf(movie.rating)];

    if (movie.title.length !== 0) {
        if (state.edit) {
            state.edit = false;
            patchMovie(movie, elements.inputForm.id.attr("data-id"))
                .then(result => result.json())
                .then(movie => updateCards(movie));
            view.toggleInputForm(state.edit);
            elements.inputForm.image.attr("src", "https://m.media-amazon.com/images/M/MV5BMTkxNDc3OTcxMV5BMl5BanBnXkFtZTgwODk2NjAzOTE@._V1_SX300.jpg");
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
                    if (movie.genre.length === 0 && data.Genre) {
                        const genreList = "action adventure comedy war crime drama historical western horror musical science";
                        const genre = data.Genre.toLowerCase().split(", ");
                        for (let i = 0; i < genre.length; i++) {
                            if (genreList.includes(genre[i])) {
                                movie.genre.push(genre[i]);
                            }
                        }
                        console.log(movie.genre);
                    }
                    postMovie(movie)
                        .then((response) => response.json())
                        .then((movie) => updateCards(movie));
                });
        }

        view.clearInput(elements.inputForm);
        elements.modal.modal('hide');
    } else {
        alert("Enter a Movie title before submitting!");
    }
});

elements.searchInput.keyup((e) => {
    e.preventDefault();
    const search = elements.searchInput.val().toLowerCase();
    const bucket = [];
    state.movies.forEach(movie => {
        for (const key in movie) {
            if (movie[key]) {
                if (Array.isArray(movie[key])) {
                    const string = movie[key].join(' ').toLowerCase();
                    if (string.includes(search)) {
                        bucket.push(movie);
                        break;
                    }
                } else if (typeof movie[key] === "number") {
                    // Do Nothing
                } else {
                    if (movie[key].toLowerCase().includes(search)) {
                        bucket.push(movie);
                        break;
                    }
                }
            }
        }
    });
    view.renderMovies(bucket);
});

elements.searchSubmit.click(e => e.preventDefault());