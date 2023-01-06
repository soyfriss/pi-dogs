const {
    getTemperaments: getTemperamentsFromDB,
    getTemperament: getTemperamentDB,
    createTemperaments
} = require('../integrations/temperament.js');

const { getTemperaments: getTemperamentsFromApi } = require('../integrations/theDogApi.js')

const getTemperaments = async () => {
    let temperaments = await getTemperamentsFromDB();

    if (temperaments.length === 0) {
        temperaments = await getTemperamentsFromApi();

        // Save temperaments to DB
        await createTemperaments(temperaments);

        temperaments = await getTemperamentsFromDB();
    }

    return temperaments;
}

const findOrCreateTemperaments = async (temperaments) => {
    return await createTemperaments(temperaments);
}

const getTemperament = async (name) => {
    if (!name.trim()) {
        return null;
    }

    return await getTemperamentDB(name.trim());
}

module.exports = {
    getTemperaments,
    getTemperament,
    findOrCreateTemperaments,
}
