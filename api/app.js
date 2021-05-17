const createError = require('http-errors');
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
const profileRouter = require('./profile/profileRouter');
const programRouter = require('./program/programRouter');
const statusRouter = require('./statuses/statusesRouter');
const serviceTypeRouter = require('./serviceTypes/serviceTypeRouter');
const serviceEntryRouter = require('./serviceEntries/serviceEntriesRouter');
const dsRouter = require('./dsService/dsRouter');
const recipientRouter = require('./recipient/recipientRouter');
const householdRouter = require('./household/householdRouter');

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
app.use(['/api/profile', '/api/profiles'], profileRouter);
app.use(['/api/program', '/api/programs'], programRouter);
app.use(['/api/status', '/api/statuses'], statusRouter);
app.use(['/api/service_type', '/api/service_types'], serviceTypeRouter);
app.use(['/api/service_entry', '/api/service_entries'], serviceEntryRouter);
app.use('/data', dsRouter);
app.use(['/api/recipient', '/api/recipients'], recipientRouter);
app.use(['/api/household', '/api/households'], householdRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  if (err instanceof createError.HttpError) {
    res.locals.message = err.message;
    res.locals.status = err.statusCode;
    if (process.env.NODE_ENV === 'development') {
      res.locals.error = err;
    }
  }
  console.error(err);
  if (process.env.NODE_ENV === 'production' && !res.locals.message) {
    res.locals.message = 'ApplicationError';
    res.locals.status = 500;
  }
  if (res.locals.status) {
    res.status(res.locals.status || 500);
    const errObject = { error: res.locals.error, message: res.locals.message };
    return res.json(errObject);
  }
  next(err);
});

module.exports = app;
