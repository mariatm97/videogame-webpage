const regexName = /^[a-zA-Z0-9 ():_-]*$/;
export const validate = (form) => {
    const errors = {}

    if (form.name === '' || !(regexName.test(form.name)))
        errors.name = 'Please, make sure to type a valid game name';

    // if (/^[a-zA-Z0-9 ():_-]*$/.test(form.name)) {
    //     setErrors({ ...errors, name: '' })
    // } else {
    //     setErrors({ ...errors, name: 'There is an error in the name' });
    //     if (form.name === '') setErrors({ ...errors, name: 'Please write the name of the game' });}

    if (form.description === '') errors.description = 'Please write the description of the game'

    // if (form.description === '') setErrors({ ...errors, description: 'Please write the description of the game' });

    if (!(/^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[012])-(19|20)[0-9]{2}$/.test(form.released)))
    errors.released = 'Wrong released date format. Should be DD-MM-YYYY'

    // if (/^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[012])-(19|20)[0-9]{2}$/.test(form.released)) { setErrors({ ...errors, released: '' }) }
    // else { setErrors({ ...errors, released: 'Wrong released date format. Should be DD-MM-YYYY' }) };

    if (!(/^[0-5]+([.][0-5]+)?$/.test(form.rating))) errors.rating = 'Rating must be a number between 0 - 5'
    // if (/^[0-5]+([.][0-5]+)?$/.test(form.rating)) { setErrors({ ...errors, rating: '' }) }
    // else { setErrors({ ...errors, rating: 'Rating must be a number between 0-5' }) }

};

export const validateSubmit = (form) => {
    //
}