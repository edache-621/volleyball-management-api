const router = require('express').Router();

const {
    getAllTeams,
    getTeamById,
    createTeam,
    updateTeam,
    deleteTeam
} = require('../controllers/teamController');

const validateTeam = require('../middleware/validateTeam');

router.get('/', getAllTeams);
router.get('/:id', getTeamById);
router.post('/', validateTeam, createTeam);
router.put('/:id', validateTeam, updateTeam);
router.delete('/:id', deleteTeam);

module.exports = router;
