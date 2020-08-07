export const getFormData = (inputForm) => {
    return {
        title: inputForm.title.val(),
        director: inputForm.director.val(),
        description: inputForm.description.val(),
        rating: $('#form-rating input[type="radio"]:checked').val(),
        poster: inputForm.url.val(),
        genre: []
    }
}

export const setFormData = (inputForm, movie) => {
    inputForm.id.attr("data-id",movie.id);
    inputForm.title.val(movie.title);
    inputForm.director.val(movie.director);
    inputForm.description.val(movie.description);
    inputForm.url.val(movie.poster);
    inputForm.image.attr('src',movie.poster);

    if(movie.genre) {
        inputForm.checkbox.each((i,e) => {
            if(movie.genre.indexOf(e.value) !== -1)
                $(e).prop("checked",true);
        });
    }
}