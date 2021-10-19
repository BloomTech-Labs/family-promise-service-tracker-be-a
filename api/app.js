const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const jsdocConfig = require('../config/jsdoc');
const dotenv = require('dotenv');
const config_result = dotenv.config();
if (process.env.NODE_ENV != 'production' && config_result.error) {
  throw config_result.error;
}
const authRequired = require('./middleware/authRequired');
const swaggerSpec = swaggerJSDoc(jsdocConfig);
const swaggerUIOptions = {
  explorer: true,
  docExpansion: 'none',
};

//###[  Routers ]###
const indexRouter = require('./index/indexRouter');
const dsRouter = require('./dsService/dsRouter');
const emailAddressRouter = require('./emailAddresses/emailAddressRouter');
const ethnicityRouter = require('./ethnicities/ethnicityRouter');
const genderRouter = require('./genders/genderRouter');
const householdRouter = require('./household/householdRouter');
const locationRouter = require('./location/locationRouter');
const locationTypeRouter = require('./locationTypes/locationTypesRouter');
const metricsRouter = require('./metrics/metricsRouter');
const phoneNumberRouter = require('./phoneNumbers/phoneNumberRouter');
const programRouter = require('./program/programRouter');
const providerRouter = require('./provider/providerRouter');
const providerRolesRouter = require('./providerRoles/providerRoleRouter');
const raceRouter = require('./races/raceRouter');
const recipientRouter = require('./recipient/recipientRouter');
const serviceEntryRouter = require('./serviceEntries/serviceEntriesRouter');
const serviceRatingsRouter = require('./serviceRatings/serviceRatingRouter');
const serviceTypeProgramsRouter = require('./serviceTypePrograms/serviceTypeProgramsRouter');
const serviceTypeRouter = require('./serviceTypes/serviceTypeRouter');
const serviceUnitsRouter = require('./serviceUnits/serviceUnitRouter');
const statusRouter = require('./statuses/statusesRouter');
const mapsRouter = require('./maps/mapsRouter');

const app = express();

process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});
// docs would need to be built and committed
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, swaggerUIOptions)
);

app.use(helmet());
app.use(express.json());
app.use(
  cors({
    origin: '*',
  })
);
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api/*', authRequired);

// application routes
app.use('/', indexRouter);
app.use('/data', dsRouter);
app.use(['/api/emailAddress', '/api/emailAddresses'], emailAddressRouter);
app.use(['/api/ethnicities', '/api/ethnicity'], ethnicityRouter);
app.use(['/api/gender', '/api/genders'], genderRouter);
app.use(['/api/household', '/api/households'], householdRouter);
app.use(['/api/location', '/api/locations'], locationRouter);
app.use(['/api/locationTypes', '/api/locationType'], locationTypeRouter);
app.use(['/api/metric', '/api/metrics'], metricsRouter);
app.use(['/api/phoneNumbers', '/api/phoneNumber'], phoneNumberRouter);
app.use(['/api/program', '/api/programs'], programRouter);
app.use(['/api/provider', '/api/providers'], providerRouter);
app.use(['/api/providerRoles', '/api/providerRole'], providerRolesRouter);
app.use(['/api/races', '/api/race'], raceRouter);
app.use(['/api/recipient', '/api/recipients'], recipientRouter);
app.use(['/api/service_entry', '/api/service_entries'], serviceEntryRouter);
app.use(['/api/serviceRatings', '/api/serviceRating'], serviceRatingsRouter);
app.use(
  ['/api/serviceTypePrograms', '/api/serviceTypeProgram'],
  serviceTypeProgramsRouter
);
app.use(['/api/service_type', '/api/service_types'], serviceTypeRouter);
app.use(['/api/serviceUnits', '/api/serviceUnit'], serviceUnitsRouter);
app.use(['/api/status', '/api/statuses'], statusRouter);
app.use(['/api/map', '/api/maps'], mapsRouter);

app.use((err, req, res, next) => {
  // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    // when actually deployed for use do not
    // send err.stack, because that can have
    // security issues
    stack: err.stack,
  });
});

module.exports = app;
