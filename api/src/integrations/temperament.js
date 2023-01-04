const { Temperament } = require('../db.js');

const flat = (temperaments) => {
    const result = temperaments.map(temperament => ({
        id: temperament.dataValues.id,
        name: temperament.dataValues.name
    }));

    return result;
}

const getTemperaments = async () => {
    let temperaments = [];

    temperaments = await Temperament.findAll();

    return flat(temperaments);
}

const createTemperaments = async (temperaments) => {
    const result = [];
    for (const name of temperaments) {
        const temperament = await Temperament.findOrCreate({
            where: { name: name }
        });
        result.push(temperament[0]);
    }

    // console.log('result: ', result);

    return result;
}


module.exports = {
    getTemperaments,
    createTemperaments,
}