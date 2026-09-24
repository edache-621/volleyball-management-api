require('dotenv').config();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');

const { connectDatabase } = require('./db/connection');
const playersRoute = require('./routes/players');
const teamsRoute = require('./routes/teams');
const authRoute = require('./routes/auth');

require('./config/passport');

const app = express();
const PORT = process.env.PORT || 7000;

app.use(cors());
app.use(express.json());

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true
        }
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/auth', authRoute);
app.use('/teams', teamsRoute);
app.use('/players', playersRoute);

app.get('/', (req, res) => {
    res.send('Volleyball Management API is running.');
});

async function startServer() {
    try {
        await connectDatabase();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();
