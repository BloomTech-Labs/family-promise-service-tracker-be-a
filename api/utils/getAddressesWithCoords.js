const addresses = require('../../data/addresses_data');
const axios = require('axios');

const getCoords = (a) => {
  return axios
    .post('http://family-promise-dev.us-east-1.elasticbeanstalk.com/geocode/', {
      address: a.address,
      address_line2: a.address_line2,
      city: a.city,
      state: a.state,
      zip: a.zip,
      country: a.country ? a.country : 'United States',
    })
    .then((res) => {
      const updatedLocation = {
        ...a,
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
  const updatedAddresses = [];
  for (const a of addresses) {
    const res = await getCoords(a);
    updatedAddresses.push(res);
  }
  return updatedAddresses;
};

module.exports = loopGetCoords;
