module.exports = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Family Promise Service Tracker',
      version: '1.0.0',
      description:
        'A monitoring and evaluation platform for services provided to the community',
      license: {
        name: 'MIT',
        url: 'https://en.wikipedia.org/wiki/MIT_License',
      },
    },
    tags: [
      {
        name: 'index',
        description: 'the status of the api',
      },
      {
        name: 'email address',
        description: 'Operations for email addresses',
      },
      {
        name: 'provider',
        description: 'Operations for providers',
      },
      {
        name: 'data',
        description: 'Operations for data science service',
      },
    ],
    externalDocs: {
      description: 'Data Science scaffold service docs',
      url: 'https://ds.labsscaffolding.dev/',
    },
    components: {
      securitySchemes: {
        okta: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'Okta idToken JWT',
        },
      },
      responses: {
        UnauthorizedError: {
          description: 'Access token is missing or invalid',
        },
        BadRequest: {
          description: 'Bad request. profile already exists',
        },
        NotFound: {
          description: 'Not Found',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    description: 'A message about the result',
                    example: 'Not Found',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: ['./api/**/*Router.js'],
};
