function capitalizeFirstLetterOnly([firstLetter, ...rest]) {
    return [firstLetter.toLocaleUpperCase(), ...rest].join('');
}

export {capitalizeFirstLetterOnly};