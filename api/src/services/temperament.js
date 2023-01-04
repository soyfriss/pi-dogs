const { getTemperaments: getTemperamentsFromDB, createTemperaments } = require('../integrations/temperament.js');
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

module.exports = {
    getTemperaments,
    findOrCreateTemperaments,
}
