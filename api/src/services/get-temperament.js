import { getTemperament } from "../integrations/db/get-temperament.js";

const getTemperament = async (name) => {
    if (!name.trim()) {
        return null;
    }

    return await getTemperament(name.trim());
}

module.exports = { getTemperament };