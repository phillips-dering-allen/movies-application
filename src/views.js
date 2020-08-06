// Colors for movie-card back
const getRandomColor = () => {
    const colors = ['#8a0e40', '#f0ad4e', '#fccc3f', '#029658', '#5bc0de', '#343464', '#6454ac', '#ec4c8c', '#008080', '#878787'];
    return colors[Math.floor(Math.random() * colors.length) + 1];
};

// Add button
const renderAdd = () => {
    return `
        <div class="movie-card" id="card-add">
            <div class="movie-card-inner">
                <div class="movie-card-front">
                    <i id="icon-add" class="far fa-plus-square"></i>
                </div>
                <div class="movie-card-back">
                    <form style="height: 100%; Width: 100%">
                        <div class="movie-card-header circle">
                            <div>
                                <input class="movie-input" type="text" id="movie-title" placeholder="Movie Title">
                            </div>
                        </div>
        
                        <div class="movie-card-body">
                            <div>
                                <textarea class="movie-description" id="movie-description" placeholder="Description"></textarea>
                            </div>
        
                            <div class="rating">
                                <input type="radio" id="star-1" name="rating" value="1">
                                <label for="star-1"><i class="fas fa-star"></i></label>
        
                                <input type="radio" id="star-2" name="rating" value="2">
                                <label for="star-2"><i class="fas fa-star"></i></label>
        
                                <input type="radio" id="star-3" name="rating" value="3">
                                <label for="star-3"><i class="fas fa-star"></i></label>
        
                                <input type="radio" id="star-4" name="rating" value="4">
                                <label for="star-4"><i class="fas fa-star"></i></label>
        
                                <input type="radio" id="star-5" name="rating" value="5">
                                <label for="star-5"><i class="fas fa-star"></i></label>
                            </div>
        
                            <button id="movie-submit">ADD MOVIE</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `
};

// Adding a new movie movie-card
export const renderMovie = (movie) => {
    return `
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
                    <h4 class="movie-rating">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                    </h4>
                </div>
            </div>
        </div>
    </div>
    `;
};

// Entire movie array
export const renderMovies = (movies) => {
    let html = "";
    movies.forEach(movie => {
        html += renderMovie(movie);
    });
    $('#movie-box').html("").append(html);
};


// export const drawCard = () => {
//     let html = `
//         <div class="movie-card"></div>
//     `;
//     $('#movie-box').append(html);
// }

// Loading animation
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

export const toggleImageHide = () => {
    $('#form-movie-image').toggle();
}

// Clearing add movie movie-card
export const clearInput = () => {
    $('#form-movie-url').parent().next().val("");
    $('#form-movie-title').parent().next().val("");
    $('#form-movie-director').parent().next().val("");
    $('#form-movie-description').parent().next().val("");
    // $("#form-").prop("checked", false);

    $('input[type="checkbox"]:checked').each((i, e) => {
        $(e).prop("checked", false);
    });

    $('#form-rating input[type="radio"]:checked').prop("checked", false);
};

export const toggleInputForm = (state) => {
    const header = $('#form-title');
    const submit = $('#input-submit');

    if(state) {
        header.text("EDIT A MOVIE!");
        submit.text("Edit Movie");
    } else {
        header.text("ADD A NEW");
        submit.text("Add Movie");
    }
}

export const DYLAN = (element) => {
    alert($(this));
}