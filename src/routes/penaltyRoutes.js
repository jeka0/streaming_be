const router = require('express').Router();
const {celebrate} = require('celebrate');
const penaltySchems = require("../validation/penaltySchems")

const {
    createPenalty,
    getPenaltyById,
    getPenaltyByUserAndChat,
    getAllPenaltys,
    getAllPenaltysByChat,
    getAllPenaltysByUser,
    getAllPenaltysByUserAndChat,
    updatePenalty,
    deletePenalty
} = require('../controllers/penaltyController');

router.get('/all', getAllPenaltys);
router.get('/chat/:id', celebrate(penaltySchems.id), getAllPenaltysByChat);
router.get('/user/:id', celebrate(penaltySchems.id), getAllPenaltysByUser);
router.get('/penaltys', celebrate(penaltySchems.query), getAllPenaltysByUserAndChat)
router.get('/', celebrate(penaltySchems.query), getPenaltyByUserAndChat);
router.get('/:id', celebrate(penaltySchems.id), getPenaltyById);
router.post('/create/:id', celebrate(penaltySchems.id), celebrate(penaltySchems.create), createPenalty);
router.put('/:id', celebrate(penaltySchems.id), celebrate(penaltySchems.update), updatePenalty);
router.delete('/:id',  celebrate(penaltySchems.id), deletePenalty);

module.exports = router;