const getRandomColor = () => {
    const colors = ['#8a0e40', '#f0ad4e', '#fccc3f', '#029658', '#5bc0de', '#343464', '#6454ac', '#ec4c8c', '#008080', '#878787'];
    return colors[Math.floor(Math.random() * colors.length)];
};

// Creates the stars for each movie and the tags
const createStarTags = (currentRating, tag) => {
    let rating = ``, tags = ``;

    if (currentRating) {
        for (let i = 0; i < currentRating; i++) {
            rating += `<i class="fas fa-star"></i>`
        }
    }

    if (tag) {
        for (let i = 0; i < 3; i++) {
            if (tag[i]) {
                tags += `<div class="tag mx-2 p-1 rounded" style="background-color: ${getRandomColor()}; border: 1px solid black">${tag[i]}</div>`
            }
        }
    }

    return {rating, tags}
}

// Renders a single movie
export const renderMovie = (movie) => {
    const html = createStarTags(movie.rating, movie.genre);
    return `
    <div class="d-flex justify-content-center align-items-center">
        <div class="movie-card" data-id="${movie.id}">
            <div class="movie-card-inner">
                <div class="movie-card-front" style="background-image: url(${movie.poster});"></div>
                <div class="movie-card-back">
                    <div class="movie-card-header circle" style="background-color: ${getRandomColor()}">
                        <div class="header-title mt-2">
                            <h3 class="movie-title">${movie.title}</h3>
                        </div>
                        <i class="fas fa-times top-left"></i>
                        <i class="fas fa-edit top-right"></i>
                    </div>
                    <div class="movie-card-body">
                        <p>${movie.description}</p>
                        <h4 class="movie-view-rating">
                            ${html.rating}
                        </h4>
                        <div class="movie-tags d-flex flex-shrink-1 justify-content-center">
                            ${html.tags}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
};

// removes a deleted movie from the page
export const removeMovie = (id) => {
    $(`div[data-id="${id}"]`).remove();
}

// Renders multiple movies to the page
export const renderMovies = (movies) => {
    let html = "";
    movies.forEach(movie => {
        html += renderMovie(movie);
    });
    $('#movie-box').html("").append(html);
};

export const toggleImage = () => {
    $('#form-movie-image').toggle();
}

// Clears the form input
export const clearInput = (inputForm) => {
    inputForm.id.attr("data-id", "");
    inputForm.title.val("");
    inputForm.director.val("");
    inputForm.description.val("");
    inputForm.url.val("");

    $('input[type="checkbox"]:checked').each((i, e) => {
        $(e).prop("checked", false);
    });

    $('#form-rating input').each((i,e) => {
        $(e).next().children().removeClass("movie-view-rating");
    });
    $('#form-rating input[type="radio"]:checked').prop("checked", false);
};

// Toggles the form between add and edit.
export const toggleInputForm = (state) => {
    const header = $('#form-title');
    const submit = $('#input-submit');

    if (state) {
        $('#modal-header').append(`
            <button type="button" class="close" style="position: absolute; left: 1em;" data-dismiss="modal" aria-label="Close" id="trash">
                <span aria-hidden="true" id="form-close"><i class='far fa-trash-alt' style="color: red"></i></span>
            </button>
        `);
        header.text("EDIT A MOVIE!");
        submit.text("Edit Movie");
    } else {
        $('#trash').remove();
        header.text("ADD A NEW MOVIE!");
        submit.text("Add Movie");
    }
}

// The function that draws the loader to the input when waiting for the movie.
export const renderLoader = () => {
    const html = `
        <div class="sk-cube-grid">
                <div class="sk-cube sk-cube1"></div>
                <div class="sk-cube sk-cube2"></div>
                <div class="sk-cube sk-cube3"></div>
                <div class="sk-cube sk-cube4"></div>
                <div class="sk-cube sk-cube5"></div>
                <div class="sk-cube sk-cube6"></div>
                <div class="sk-cube sk-cube7"></div>
                <div class="sk-cube sk-cube8"></div>
                <div class="sk-cube sk-cube9"></div>
        </div>
    `;
    $('#form-movie-container').append(html);
};