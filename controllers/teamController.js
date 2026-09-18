const { ObjectId } = require('mongodb');
const { getDatabase } = require('../db/connection');

const getAllTeams = async (req, res) => {
    try {
        const db = getDatabase();
        const teams = await db.collection('teams').find().toArray();

        res.status(200).json(teams);
    } catch (error) {
        console.error('Error getting teams:', error);
        res.status(500).json({
            error: 'An error occurred while getting teams.'
        });
    }
};

const getTeamById = async (req, res) => {
    try {
        const db = getDatabase();

        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                error: 'Invalid team ID.'
            });
        }

        const team = await db.collection('teams').findOne({
            _id: new ObjectId(req.params.id)
        });

        if (!team) {
            return res.status(404).json({
                error: 'Team not found.'
            });
        }

        res.status(200).json(team);
    } catch (error) {
        console.error('Error getting team by ID:', error);
        res.status(500).json({
            error: 'An error occurred while getting the team.'
        });
    }
};

const createTeam = async (req, res) => {
    try {
        const {
            name,
            location,
            coach,
            division,
            season,
            foundedYear
        } = req.body;

        const newTeam = {
            name,
            location,
            coach,
            division,
            season,
            foundedYear
        };

        const db = getDatabase();
        const result = await db.collection('teams').insertOne(newTeam);

        res.status(201).json({
            message: 'Team created successfully.',
            teamId: result.insertedId
        });
    } catch (error) {
        console.error('Error creating team:', error);
        res.status(500).json({
            error: 'An error occurred while creating the team.'
        });
    }
};

const updateTeam = async (req, res) => {
    try {
        const db = getDatabase();

        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                error: 'Invalid team ID.'
            });
        }

        const {
            name,
            location,
            coach,
            division,
            season,
            foundedYear
        } = req.body;

        const updatedTeam = {
            name,
            location,
            coach,
            division,
            season,
            foundedYear
        };

        const result = await db.collection('teams').replaceOne(
            { _id: new ObjectId(req.params.id) },
            updatedTeam
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({
                error: 'Team not found.'
            });
        }

        res.status(200).json({
            message: 'Team updated successfully.'
        });
    } catch (error) {
        console.error('Error updating team:', error);
        res.status(500).json({
            error: 'An error occurred while updating the team.'
        });
    }
};

const deleteTeam = async (req, res) => {
    try {
        const db = getDatabase();

        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                error: 'Invalid team ID.'
            });
        }

        const result = await db.collection('teams').deleteOne({
            _id: new ObjectId(req.params.id)
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({
                error: 'Team not found.'
            });
        }

        res.status(200).json({
            message: 'Team deleted successfully.'
        });
    } catch (error) {
        console.error('Error deleting team:', error);
        res.status(500).json({
            error: 'An error occurred while deleting the team.'
        });
    }
};

module.exports = {
    getAllTeams,
    getTeamById,
    createTeam,
    updateTeam,
    deleteTeam
};