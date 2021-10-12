const locations = require('./addresses_data');
const axios = require('axios');

const getCoords = (l) => {
  return axios
    .post('http://family-promise-dev.us-east-1.elasticbeanstalk.com/geocode/', {
      address: l.address,
      address_line2: l.address_line2,
      city: l.city,
      state: l.state,
      zip: l.zip,
      country: l.country ? l.country : 'United States',
    })
    .then((res) => {
      const updatedLocation = {
        ...l,
        location_longitude: res.data.longitude,
        location_latitude: res.data.latitude,
      };
      return updatedLocation;
    })
    .catch((err) => {
      console.log('error with axios call', err);
    });
};

const loopGetCoords = async () => {
  const updatedLocations = [];
  for (const l of locations) {
    const res = await getCoords(l);
    updatedLocations.push(res);
  }
  return updatedLocations;
};

module.exports = loopGetCoords;
