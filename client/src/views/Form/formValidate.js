const regexName = /^[a-zA-Z0-9 ():_-]*$/;
const regexReleased = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[012])-(19|20)[0-9]{2}$/;
const regexRating = /^[0-5]+([.][0-5]+)?$/;
const regexImg = /^https?:\/\/(?:www\.)?\S+\.(?:jpg|jpeg|png|gif)$/i;

export const validate = (form) => {
    const errors = {}

    if (!(regexName.test(form.name)))
        errors.name = 'Please type a valid game name (no special characters)';
    if (form.name === '')
        errors.name = 'Please type a valid game name (non-empty string)';
    // if (!(/^[a-zA-Z ]{4,}$/.test(form.name)))
    //     errors.name = 'Please type a valid game name (must have more than 4 letters)';

    if (form.description === '') errors.description = 'Please write the description of the game'

    if (form.released === '');
    else if (!(regexReleased.test(form.released)))
        errors.released = 'Wrong released date format. Should be DD-MM-YYYY';

    if (form.rating === '');
    else if (!(regexRating.test(form.rating))) errors.rating = 'Rating must be a number between 0 - 5'

    if (!(regexImg.test(form.image)))
        errors.image = 'Please type a valid URL';
    // if (form.genres.length === 0) errors.genres = 'Select at least one genre.';

    // if (form.platforms.length === 0) errors.platforms = 'Select at least one platform.';

    return errors;
};

