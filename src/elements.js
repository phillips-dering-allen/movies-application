export const elements = {
    modal: $('#modal-form'),
    movieBox: $('#movie-box'),
    inputForm: {
        id: $('input[type="hidden"]'),
        title: $('#form-movie-title').parent().next(),
        director: $('#form-movie-director').parent().next(),
        description: $('#form-movie-description').parent().next(),
        checkbox: $('input[type="checkbox"]'),
        url: $('#form-movie-url').parent().next(),
        image: $('#form-movie-image'),
        exit: $('#form-close'),
        submit: $('#input-submit'),
        stars: $('.fa-star'),
    },
    searchInput: $("#search-input"),
    searchSubmit: $("#search-submit")
}