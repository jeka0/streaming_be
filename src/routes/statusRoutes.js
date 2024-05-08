const router = require('express').Router();
const {celebrate} = require('celebrate');
const statusSchems = require("../validation/statusSchems")

const {
    createStatus,
    getStatusById,
    getStatusByCode,
    getAllStatuses,
    getAllStatusesByCode,
    updateStatus,
    deleteStatus
} = require('../controllers/statusControllert');

router.get('/all', getAllStatuses);
router.get('/all/code', celebrate(statusSchems.code), getAllStatusesByCode);
router.get('/code', celebrate(statusSchems.code), getStatusByCode);
router.get('/:id', celebrate(statusSchems.id), getStatusById);
router.post('/create', celebrate(statusSchems.code), createStatus);
router.put('/:id', celebrate(statusSchems.id), celebrate(statusSchems.code), updateStatus);
router.delete('/:id',  celebrate(statusSchems.id), deleteStatus);

module.exports = router;