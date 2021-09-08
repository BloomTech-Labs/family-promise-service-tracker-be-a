Setting up your local development environment:

1. Clone down the repo - Do not fork!
2. `cd` into project
3. Open in editor
4. `git checkout` into your own branch
5. Open and review README.md
6. Set up environment variables - .env file
   a. Run the command `cp .env.sample .env` to copy sample .env file
   b. Do no make any changes to .env.sample file - used in the build and testing
   c. **Make sure to not commit your .env file and that it is git ignored**
   d. Update the environment variables below to match your local setup
   _ OKTA_URL_ISSUER
   _ OKTA_ORG_URL
   _ OKTA_CLIENT_ID
   _ OKTA_API_TOKEN
7. Set up the Postgres DB using Docker - download if needed: https://docs.docker.com/get-docker/
8. Run the command `docker-compose up -d` to start up the postgresql database and pgadmin
9. Open a browser to - pgadmin - (http://localhost:5050/)
   a. Username and Password are located in docker-compose.yml under the environment section for pgadmin
   b. pgadmin is a web frontend allows you to create db and do queries
   c. Connect to the API-DEV server - password in docker-compose.yml
10. Make sure you have an api-dev DB, if you don’t, right click on Databases to create
11. Run ‘npm install’
12. Run migrations
    a. DEV_DATABASE_URL in environment variables is used to set up to run against your local - this will replaced when you deploy to Heroku
    b. Run `npm run knex migrate:latest` to create the starting schema.
    c. Run `npm run knex seed:run` to populate your db with some data.
