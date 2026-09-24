const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Volleyball Team Management API',
        description:
            'A RESTful API for managing volleyball players and teams with GitHub OAuth authentication.',
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
        },
        {
            name: 'Authentication',
            description: 'GitHub OAuth authentication.'
        }
    ]
};

const outputFile = './swagger.json';
const endpointsFiles = [
    './server.js',
    './routes/players.js',
    './routes/teams.js',
    './routes/auth.js'
];

swaggerAutogen(outputFile, endpointsFiles, doc);
