var dotenv = require('dotenv');
dotenv.config({ path: '../.env' });
const pg = require('pg');

// Need to set prod SSL settings for Heroku, see here:
// https://devcenter.heroku.com/articles/heroku-postgresql#connecting-in-node-js
// Since Heroku will automatically set the DATABASE_URL env variable, your local
// env file only requires DEV_DATABASE_URL and will fail if a DATABASE_URL var is included
if (process.env.DATABASE_URL) {
  pg.defaults.ssl = { rejectUnauthorized: false };
}

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DEV_DATABASE_URL,
    migrations: { directory: '../data/migrations' },
    seeds: { directory: '../data/seeds' },
    pool: {
      min: 2,
      max: 10,
    },
  },

  test: {
    client: 'pg',
    connection: process.env.DEV_DATABASE_URL,
    migrations: { directory: './data/migrations' },
    seeds: { directory: './data/seeds' },
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: { directory: '../data/migrations' },
    seeds: { directory: '../data/seeds' },
  },
};
