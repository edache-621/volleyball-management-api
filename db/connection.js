const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGODB_URL);

let database;

async function connectDatabase() {
    try {
        await client.connect();
        database = client.db('volleyball_management');
        console.log('Connected to MongoDB');
        return database;
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        throw error;
    }
}

function getDatabase() {
    if (!database) {
        throw new Error('Database is not connected.');
    }

    return database;
}

module.exports = {
    connectDatabase,
    getDatabase
};