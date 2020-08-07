module.exports = {
    /* Gets the Movies from the database */
    getMovies: () => {
        return fetch('/api/movies')
            .then(response => response.json());
    },

    /* Gets a single movie from the database */
    getMovie: (id) => {
        return fetch(`/api/movies/${id}`)
            .then(response => response.json());
    },

    /* Posts a movie to the database */
    postMovie: (movie) => {
        if (!movie.poster) {
            movie.poster = "https://m.media-amazon.com/images/M/MV5BMTkxNDc3OTcxMV5BMl5BanBnXkFtZTgwODk2NjAzOTE@._V1_SX300.jpg";
        }
        return fetch(`/api/movies`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movie)
        }).then().catch(error => console.log(error));
    },

    /* Edits a movie in the database */
    patchMovie: (movie, id) => {
        return fetch(`api/movies/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movie),
        }).then().catch(error => console.log(error));
    },

    /* Deletes a movie from the database */
    deleteMovie: (id) => {
        return fetch(`api/movies/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then().catch(error => console.log(error));
    }
}