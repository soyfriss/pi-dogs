const { Router } = require('express');

const router = Router();

router.use('/dogs', require('./get-breeds.js'));
router.use('/dogs', require('./get-breed-by-id.js'));
router.use('/dogs', require('./post-breed.js'));

router.use('/temperaments', require('./get-temperaments.js'));

router.use('/health-check', require('./get-status-ok.js'));

module.exports = router;