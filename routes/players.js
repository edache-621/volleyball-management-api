const router = require('express').Router();

const {
    getAllPlayers,
    getPlayerById,
    createPlayer,
    updatePlayer,
    deletePlayer
} = require('../controllers/playerController');

const validatePlayer = require('../middleware/validatePlayer');
const isAuthenticated = require('../middleware/authenticate');

router.get('/', getAllPlayers);
router.get('/:id', getPlayerById);

router.post('/', isAuthenticated, validatePlayer, createPlayer);
router.put('/:id', isAuthenticated, validatePlayer, updatePlayer);
router.delete('/:id', isAuthenticated, deletePlayer);

module.exports = router;