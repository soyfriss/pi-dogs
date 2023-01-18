const { Router } = require('express');

const router = Router();

router.use('/dogs', require('./get-breeds.js'));
router.use('/dogs', require('./get-breed.js'));
router.use('/dogs', require('./post-breed.js'));

router.use('/temperaments', require('./get-temperaments.js'));

module.exports = router;