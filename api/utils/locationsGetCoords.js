// const { findAll, updateLocation } = require('../location/locationModel');
//   updateLocation(updatedLocationObj.id, updatedLocationObj);
//   const locations = await findAll();

const axios = require('axios');

const locationData = [
  {
    address: '507 N Howard St',
    city: 'Spokane',
    state: 'WA',
    zip: '99201',
  },
  {
    address: '308 S Washington St',
    city: 'Denver',
    state: 'CO',
    zip: '80209',
  },
  {
    address: '404 W Main Ave',
    city: 'Spokane',
    state: 'WA',
    zip: '99201',
  },
];


const getCoords = async (l) => {
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
      return updatedLocation;
    })
    .catch((err) => {
      console.log('error with axios call', err);
    });
};

const delayFunction = (index) => {
  let location = locationData[index];
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(getCoords(location));
    }, 3000)
  );
};

const asyncCall = async () => {
  for (let i = 0; i < locationData.length; i++) {
    console.log('calling');
    const result = await delayFunction(i);
    console.log(result);
  }
};

asyncCall();
