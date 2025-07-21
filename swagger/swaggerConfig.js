const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Restaurant Bot API',
      version: '1.0.0',
      description: 'API documentation for the Restaurant Bot project',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./routes/*.js'], // path to your route files
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
