const { Op } = require('sequelize');
const { Breed, Temperament } = require('../../db.js');

const getBreeds = async (name, exactSearch) => {
    const options = {};
    if (name) {
        if (exactSearch) {
            options.where = { name: { [Op.iLike]: name.trim() } };
        } else {
            if (name.length === 1) {
                options.where = { name: { [Op.iLike]: `${name}%` } };
            } else {
                options.where = { name: { [Op.iLike]: `%${name}%` } };
            }
        }
    }
    options.attributes = ['id', 'name', 'weight', 'image'];
    options.include = [{ model: Temperament, attributes: ['id', 'name'] }];

    let breeds = await Breed.findAll(options);
    // console.log('options and breeds from db: ', options, breeds);

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

module.exports = { getBreeds, getBreed };