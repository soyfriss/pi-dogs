const { Router } = require('express');
const { breedExists } = require('../services/breed.js');
const httpStatusCodes = require('../utils/httpStatusCodes.js');

const router = Router();

// GET /dog, /dog?name=breed
router.get(
    '/',
    async (req, res, next) => {
        try {
            const { name } = req.query;

            const response = await breedExists(name);

            res.status(httpStatusCodes.OK).json(response);
        } catch (error) {
            next(error)
        }
    }
);

module.exports = router;