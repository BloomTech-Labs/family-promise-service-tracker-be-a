// const { findAll, updateLocation } = require('../location/locationModel');
const locationsData = require('./locations_sample');
//   updateLocation(updatedLocationObj.id, updatedLocationObj);
//   const locations = await findAll();

// const locationsData = [
//   {
//     address: '123 Gilman Dr W',
//     address_line2: '',
//     city: 'Seattle',
//     state: 'WA',
//     zip: '98119',
//     country: 'United States',
//   },
// ];
const axios = require('axios');

const getCoords = async (l) => {
  const result = [];
  await axios
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
      result.push(updatedLocation);
    })
    .catch((err) => {
      console.log('error with axios call', err);
    });
  return result[0];
};

const delayFunction = (index) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(getCoords(locationsData[index]));
    }, 1)
  );
};

const asyncCall = async () => {
  let allLocations = [];
  for (let i = 0; i < locationsData.length; i++) {
    console.log('calling');
    let location = await delayFunction(i);
    console.log(location);
    allLocations.push(location);
  }
  console.log(allLocations);
};

asyncCall();
