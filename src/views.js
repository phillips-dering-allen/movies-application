// Colors for card back
const getRandomColor = () => {
    const colors = ['#8a0e40', '#f0ad4e', '#fccc3f', '#029658', '#5bc0de', '#343464', '#6454ac', '#ec4c8c', '#008080', '#878787'];
    return colors[Math.floor(Math.random() * colors.length) + 1];
};

// Add button
const renderAdd = () => {
    return `
        <div class="card" id="card-add">
            <div class="card-inner">
                <div class="card-front">
                    <i id="icon-add" class="far fa-plus-square"></i>
                </div>
                <div class="card-back">
                    <form style="height: 100%; Width: 100%">
                        <div class="card-header circle">
                            <div>
                                <input class="movie-input" type="text" id="movie-title" placeholder="Movie Title">
                            </div>
                        </div>
        
                        <div class="card-body">
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

// Adding a new movie card
export const renderMovie = (movie) => {
    return `
    <div class="card" data-id="${movie.id}">
        <div class="card-inner">
            <div class="card-front" style="background-image: url(${movie.poster});"></div>
            <div class="card-back">
                <div class="card-header circle" style="background-color: ${getRandomColor()}">
                    <div class="header-title">
                        <h2 class="movie-title">${movie.title}</h2>
                    </div>
                    <i class="fas fa-times top-left"></i>
                    <i class="fas fa-edit top-right"></i>
                </div>
                <div class="card-body">
                    <p>${movie.description}</p>
                    <h3 class="movie-rating">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                    </h3>
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
//         <div class="card"></div>
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
    $('#movie-box').html("").append(html);
};

// Clearing add movie card
export const clearInput = () => {
    $('#movie-title').val("");
    $('#movie-rating').val(1);
};

export const DYLAN = (element) => {
    alert($(this));
}