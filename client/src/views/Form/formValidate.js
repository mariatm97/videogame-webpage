const regexName = /^[a-zA-Z0-9 ():_-]*$/;
export const validate = (form) => {
    const errors = {}

    if (!(regexName.test(form.gameName)))
        errors.name = 'Please type a valid game name (no special characters)';
    if (form.name === '')
        errors.name = 'Please type a valid game name (non-empty string)';

    if (form.description === '') errors.description = 'Please write the description of the game'

    if (form.released === '');
    else if (!(/^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[012])-(19|20)[0-9]{2}$/.test(form.released)))
        errors.released = 'Wrong released date format. Should be DD-MM-YYYY';

    if (form.rating === '');
    else if (!(/^[0-5]+([.][0-5]+)?$/.test(form.rating))) errors.rating = 'Rating must be a number between 0 - 5'

    // if (form.genres.length < 1)
    //     errors.genres = "Select at least one genre";

    // if (form.platforms.length < 1)
    //     errors.platforms = "Select at least one platform";

    return errors;
};

export const validateSubmit = (form) => {
    //
}