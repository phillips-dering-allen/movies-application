module.exports = {
    getMovies: () => {
        return fetch('/api/movies')
            .then(response => response.json());
    },
    getMovie: (id) => {
        return fetch(`/api/movies/${id}`)
            .then(response => response.json());
    },
    postMovie: (movie) => {
        if(!movie.poster) {
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
    patchMovie: (movie, id) => {
        return fetch(`api/movies/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movie),
        }).then().catch(error => console.log(error));
    },
    deleteMovie : (id) => {
        return fetch(`api/movies/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then().catch(error => console.log(error));
    }

}