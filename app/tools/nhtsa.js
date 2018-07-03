const { API_URL } = require('../../config').nhtsa;
const axios = require('axios');

// VehicleId/<VehicleId>
const _addJsonSufix = url => `${url}?format=json`;
const _mountRetrieveVehicleListUrl = ({ modelYear, manufacturer, model }) => (
  _addJsonSufix(`${API_URL}/SafetyRatings/modelyear/${modelYear}/make/${manufacturer}/model/${model}`)
);

const _mountFindOneVehicleUrl = vehicleId => (_addJsonSufix(`${API_URL}/SafetyRatings/VehicleId/${vehicleId}?format=json`));

function retrieveVehicleList(params) {
  return axios.get(_mountRetrieveVehicleListUrl(params))
    .then(response => response.data)
    .catch(e => {
      console.error('error on requesting nhtsa');
      return e;
    });
}

function findOneVehicle(vehicleId) {
  return axios.get(_mountFindOneVehicleUrl(vehicleId))
    .then(response => (response.data && response.data.Results) ? response.data.Results[0] : null)
    .catch(e => {
      console.error('error on requesting nhtsa');
      return e;
    });
}

module.exports = {
  retrieveVehicleList,
  findOneVehicle
}