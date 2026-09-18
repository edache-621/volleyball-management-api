const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Volleyball Team Management API',
        description:
            'A RESTful API for managing volleyball players and teams.',
        version: '1.0.0'
    },
    host: 'localhost:7000',
    schemes: ['http'],
    tags: [
        {
            name: 'Players',
            description: 'Operations for managing volleyball players.'
        },
        {
            name: 'Teams',
            description: 'Operations for managing volleyball teams.'
        }
    ]
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);