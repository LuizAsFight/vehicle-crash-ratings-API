const express = require('express');
const router = express.Router();
const { nhtsa } = require('./tools');

// Ping
router.use('/ping', (req, res) => res.send({ message: `Application is up and running`}));

// Vehicles
router.use('/vehicles', require('./modules/vehicle/routes'));

module.exports = router;
