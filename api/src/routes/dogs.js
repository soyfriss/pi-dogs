const { Router } = require('express');
const { getBreeds, getBreed, createBreed } = require('../services/breed.js');
const httpStatusCodes = require('../utils/httpStatusCodes.js');

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

// GET /dogs/{idRaza}?source=local|external
router.get(
    '/:id',
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const { source } = req.query;

            const breed = await getBreed(id, source);

            res.status(httpStatusCodes.OK).json(breed);
        } catch (error) {
            next(error);
        }
    }
);

router.post(
    '/',
    async (req, res, next) => {
        try {
            const {
                name,
                height,
                weight,
                lifeSpan,
                temperaments,
                image
            } = req.body;

            // console.log(name, height, weight, lifeSpan, temperaments, image);

            const breed = await
                createBreed(
                    name && name.trim(),
                    height && height.trim(),
                    weight && weight.trim(),
                    lifeSpan && lifeSpan.trim(),
                    temperaments,
                    image && image.trim()
                );

                res.status(httpStatusCodes.OK).json(breed);
        } catch (error) {
            next(error);
        }
    }
)

module.exports = router;
