const getRandomColor = () => {
    const colors = ['#8a0e40','#f0ad4e','#fccc3f','#029658','#5bc0de','#343464','#6454ac','#ec4c8c','#008080','#878787'];
    // e8ce72
    // fcdc6c
    return colors[Math.floor(Math.random() * colors.length) + 1];
}

const renderMovie = (movie) => {
    return `
        <div class="ma-card">
        <div class="ma-card-inner">
            <div class="ma-card-front" style="background-image: url(https://m.media-amazon.com/images/M/MV5BYTYxNGMyZTYtMjE3MS00MzNjLWFjNmYtMDk3N2FmM2JiM2M1XkEyXkFqcGdeQXVyNjY5NDU4NzI@._V1_SX300.jpg)">
<!--                <img src="https://m.media-amazon.com/images/M/MV5BYTYxNGMyZTYtMjE3MS00MzNjLWFjNmYtMDk3N2FmM2JiM2M1XkEyXkFqcGdeQXVyNjY5NDU4NzI@._V1_SX300.jpg" alt="${movie.title}">-->
            </div>
            <div class="ma-card-back">
                <div class="ma-card-header circle" style="background-color: ${getRandomColor()}">
                    <h2 class="movie-title">${movie.title}</h2>
                </div>
                <div class="ma-card-body">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus dolorem doloremque earum impedit rem rerum unde vero. Adipisci, delectus dolor dolores impedit ipsa modi molestias odio officiis, omnis ratione vel.</p>
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
}

export const renderMovies = (movies) => {
    let html = "";
    movies.forEach(movie => {
        html += renderMovie(movie);
    });
    $('#movie-box').html("").append(html);
}

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
}

export const clearInput = () => {
    $('#movie-title').val("");
    $('#movie-rating').val(1);
}