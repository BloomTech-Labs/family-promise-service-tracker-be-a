const axios = require('axios');
const dsConfig = require('../../config/dsConfig');
const dsClient = axios.create(dsConfig);

const getPrediction = (x1, x2, x3) => {
  return dsClient.post('/predict', { x1, x2, x3 });
};

const getViz = (state) => {
  return dsClient.get(`/viz/${state}`);
};

const getTotal = () => {
  return dsClient.get('/total_served');
};

const getFamilies = () => {
  return dsClient.get('/families_served');
};

const getChildren = () => {
  return dsClient.get('/children_served');
};

const getGender = () => {
  return dsClient.get('/genders_served');
};

const getRace = () => {
  return dsClient.get('races_served');
};

const getEthnicities = () => {
  return dsClient.get('ethnicities_served');
};

const getPrograms = () => {
  return dsClient.get('program_enrollment');
};

module.exports = {
  getPrediction,
  getViz,
  getTotal,
  getFamilies,
  getChildren,
  getGender,
  getRace,
  getEthnicities,
  getPrograms,
};
