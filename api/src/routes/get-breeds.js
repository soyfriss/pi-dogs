const { Router } = require('express');
const { getBreeds } = require('../services/get-breeds.js');

const httpStatusCodes = require('../utils/http-status-codes.js');

const router = Router();

// GET /dogs, /dogs?name=breed&exactSearch=bool
router.get(
    '/',
    async (req, res, next) => {
        try {
            const { name, exactSearch } = req.query;

            const breeds = await getBreeds(name && name.trim(), exactSearch === 'true');

            res.status(httpStatusCodes.OK).json(breeds);
        } catch (error) {
            next(error)
        }
    }
);

module.exports = router;
