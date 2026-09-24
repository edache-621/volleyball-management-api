const router = require('express').Router();

const {
    getAllTeams,
    getTeamById,
    createTeam,
    updateTeam,
    deleteTeam
} = require('../controllers/teamController');

const validateTeam = require('../middleware/validateTeam');
const isAuthenticated = require('../middleware/authenticate');

router.get('/', getAllTeams);
router.get('/:id', getTeamById);

router.post('/', isAuthenticated, validateTeam, createTeam);
router.put('/:id', isAuthenticated, validateTeam, updateTeam);
router.delete('/:id', isAuthenticated, deleteTeam);

module.exports = router;
