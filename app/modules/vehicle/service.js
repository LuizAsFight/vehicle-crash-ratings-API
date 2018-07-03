const Promise = require('bluebird');
const Joi = require('joi');
const { validate, nhtsa } = require('../../tools');

const validateFilters = filters => validate(filters, {
  modelYear: Joi.number().required(),
  manufacturer: Joi.required(),
  model: Joi.required()
});

const parseCarListResponse = response => {
  const results = response.Results
    .map(({ VehicleDescription, VehicleId }) => ({
      Description: VehicleDescription,
      VehicleId
    }));

  return {
    Results: results,
    Count: results.length
  };
};

const parseFindOneResult = result => ({ CrashRating: result.OverallRating });

const validateCarListResponse = response => {
  if (!response.Results || !response.Results.length) throw new Error('Results not found for filters informed.');
}

class VehicleService {
  static async retrieveVehicles(filters = {}, withRatings) {
    try {
      const validatedParams = await validateFilters(filters);
      const carListResponse = await nhtsa.retrieveVehicleList(validatedParams);

      validateCarListResponse(carListResponse);

      const result = parseCarListResponse(carListResponse);

      if (withRatings === 'true') {
        const findOneResults = await Promise.all(
          result.Results
            .map(vehicle => nhtsa.findOneVehicle(vehicle.VehicleId))
        );

        findOneResults.forEach((vehicle, i) => Object.assign(result.Results[i], parseFindOneResult(vehicle)))
      }

      return result;

    } catch(e) {
      return {
        Count: 0,
        Results: []
      };
    }
  }
}

module.exports = VehicleService;