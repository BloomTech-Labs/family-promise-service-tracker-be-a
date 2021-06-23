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
};

//###[  Routers ]###
const indexRouter = require('./index/indexRouter');
const providerRouter = require('./provider/providerRouter');
const programRouter = require('./program/programRouter');
const statusRouter = require('./statuses/statusesRouter');
const serviceTypeRouter = require('./serviceTypes/serviceTypeRouter');
const serviceEntryRouter = require('./serviceEntries/serviceEntriesRouter');
const dsRouter = require('./dsService/dsRouter');
const recipientRouter = require('./recipient/recipientRouter');
const householdRouter = require('./household/householdRouter');
const metricsRouter = require('./metrics/metricsRouter');
const locationRouter = require('./location/locationRouter');

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
app.use(['/api/provider', '/api/providers'], providerRouter);
app.use(['/api/program', '/api/programs'], programRouter);
app.use(['/api/status', '/api/statuses'], statusRouter);
app.use(['/api/service_type', '/api/service_types'], serviceTypeRouter);
app.use(['/api/service_entry', '/api/service_entries'], serviceEntryRouter);
app.use('/data', dsRouter);
app.use(['/api/recipient', '/api/recipients'], recipientRouter);
app.use(['/api/household', '/api/households'], householdRouter);
app.use(['/api/metric', '/api/metrics'], metricsRouter);
app.use(['/api/location', '/api/locations'], locationRouter);

app.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = app;
