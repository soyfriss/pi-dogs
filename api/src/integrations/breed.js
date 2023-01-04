const { Op } = require('sequelize');
const { Breed, Temperament } = require('../db.js');

const getBreeds = async (name) => {
    const options = name
        ? { where: { name: { [Op.iLike]: `%${name}%` } } }
        : {}
    options.attributes = ['id', 'name', 'weight'];
    options.include = [{ model: Temperament, attributes: ['id', 'name'] }];

    let breeds = await Breed.findAll(options);
    // console.log('breeds from db: ', breeds);

    breeds = breeds.map(breed => ({
        id: breed.dataValues.id,
        name: breed.dataValues.name,
        weight: breed.dataValues.weight,
        image: breed.dataValues.image,
        temperament: breed.dataValues.Temperaments.map(temperament => temperament.name).join(', '),
        source: 'local'
    }));

    return breeds;
}

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
    console.log('new breed: ', breed);

    return breed;
}

module.exports = {
    getBreeds,
    getBreed,
    createBreed
}
