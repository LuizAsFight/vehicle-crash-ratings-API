const { response } = require('./../../tools');
const express = require('express');
const VehicleService = require('./service');
const router = express.Router();

router.get('/:modelYear/:manufacturer/:model', (req, res) => (
  response.wrapper(res, VehicleService.retrieveVehicles(req.params, req.query.withRatings))
));

router.post('/', (req, res) => (
  response.wrapper(res, VehicleService.retrieveVehicles(req.body, req.query.withRatings))
));

module.exports = router;
