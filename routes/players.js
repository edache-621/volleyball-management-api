const router = require('express').Router();

const {
    getAllPlayers,
    getPlayerById,
    createPlayer,
    updatePlayer,
    deletePlayer
} = require('../controllers/playerController');

const validatePlayer = require('../middleware/validatePlayer');

router.get('/', getAllPlayers);
router.get('/:id', getPlayerById);
router.post('/', validatePlayer, createPlayer);
router.put('/:id', validatePlayer, updatePlayer);
router.delete('/:id', deletePlayer);

module.exports = router;