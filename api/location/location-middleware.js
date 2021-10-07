const axios = require('axios');

function validateBody(req, res, next) {
  const { city, state, zip } = req.body;
  if (!city || !state || !zip) {
    next({
      message: 'City, state and zip code are all required',
      status: 400,
    });
  } else {
    next();
  }
}

function getCoords(req, res, next) {
  const { address, address_line2, city, state, zip, country } = req.body;

  axios
    .post('http://family-promise-dev.us-east-1.elasticbeanstalk.com/geocode/', {
      address: address,
      address_line2: address_line2,
      city: city,
      state: state,
      zip: zip,
      country: country ? country : 'United States',
    })
    .then((res) => {
      req.body.location_longitude = res.data.longitude;
      req.body.location_latitude = res.data.latitude;
      next();
    })
    .catch((err) => {
      next({
        message: err,
        status: 500,
      });
    });
}

module.exports = { getCoords, validateBody };
