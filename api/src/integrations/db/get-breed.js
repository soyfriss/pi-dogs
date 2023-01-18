const { Breed, Temperament } = require('../../db.js');

const getBreed = async (id) => {
    let breed = await Breed.findByPk(id, { include: [Temperament] });
    // console.log('breed: ', breed);

    if (breed) {
        breed = {
            id: breed.dataValues.id,
            name: breed.dataValues.name,
            weight: breed.dataValues.weight,
            height: breed.dataValues.height,
            lifeSpan: breed.dataValues.lifeSpan,
            image: breed.dataValues.image,
            temperament: breed.dataValues.Temperaments.map(temperament => temperament.name).join(', '),
            source: 'local'
        }
    }

    return breed;
}

module.exports = { getBreed };