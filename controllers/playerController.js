const { getDatabase } = require('../db/connection');

const getAllPlayers = async (req, res) => {
    try {
        const db = getDatabase();
        const players = await db.collection('players').find().toArray();

        res.status(200).json(players);
    } catch (error) {
        console.error('Error getting players:', error);
        res.status(500).json({
            error: 'An error occurred while getting players.'
        });
    }
};

const createPlayer = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            phone,
            position,
            jerseyNumber,
            height,
            team,
            status
        } = req.body;

        const newPlayer = {
            firstName,
            lastName,
            email,
            phone,
            position,
            jerseyNumber,
            height,
            team,
            status
        };

        const db = getDatabase();
        const result = await db.collection('players').insertOne(newPlayer);

        res.status(201).json({
            message: 'Player created successfully.',
            playerId: result.insertedId
        });
    } catch (error) {
        console.error('Error creating player:', error);
        res.status(500).json({
            error: 'An error occurred while creating the player.'
        });
    }
};
const getPlayerById = async (req, res) => {
    try {
        const { ObjectId } = require('mongodb');
        const db = getDatabase();

        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                error: 'Invalid player ID.'
            });
        }

        const player = await db.collection('players').findOne({
            _id: new ObjectId(req.params.id)
        });

        if (!player) {
            return res.status(404).json({
                error: 'Player not found.'
            });
        }

        res.status(200).json(player);
    } catch (error) {
        console.error('Error getting player by ID:', error);
        res.status(500).json({
            error: 'An error occurred while getting the player.'
        });
    }
};

const updatePlayer = async (req, res) => {
    try {
        const { ObjectId } = require('mongodb');
        const db = getDatabase();

        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                error: 'Invalid player ID.'
            });
        }

        const {
            firstName,
            lastName,
            email,
            phone,
            position,
            jerseyNumber,
            height,
            team,
            status
        } = req.body;

        const updatedPlayer = {
            firstName,
            lastName,
            email,
            phone,
            position,
            jerseyNumber,
            height,
            team,
            status
        };

        const result = await db.collection('players').replaceOne(
            { _id: new ObjectId(req.params.id) },
            updatedPlayer
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({
                error: 'Player not found.'
            });
        }

        res.status(200).json({
            message: 'Player updated successfully.'
        });
    } catch (error) {
        console.error('Error updating player:', error);
        res.status(500).json({
            error: 'An error occurred while updating the player.'
        });
    }
};

const deletePlayer = async (req, res) => {
    try {
        const { ObjectId } = require('mongodb');
        const db = getDatabase();

        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                error: 'Invalid player ID.'
            });
        }

        const result = await db.collection('players').deleteOne({
            _id: new ObjectId(req.params.id)
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({
                error: 'Player not found.'
            });
        }

        res.status(200).json({
            message: 'Player deleted successfully.'
        });
    } catch (error) {
        console.error('Error deleting player:', error);
        res.status(500).json({
            error: 'An error occurred while deleting the player.'
        });
    }
};

module.exports = {
    getAllPlayers,
    createPlayer,
    getPlayerById,
    updatePlayer,
    deletePlayer
};