const { Breed } = require('../../db.js');

const createBreed = async (name, height, weight, lifeSpan, temperaments, image) => {
    const breed = await Breed.create({
        name,
        height,
        weight,
        lifeSpan,
        image
    });

    if (temperaments.length > 0) {
        await breed.addTemperaments(temperaments);
    }

    breed.source = 'local';
    // console.log('new breed: ', breed);

    return breed;
}

module.exports = { createBreed };

