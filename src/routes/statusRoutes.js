const router = require('express').Router();
const {celebrate} = require('celebrate');
const { checkAdminRole } = require('../middlewares/checkAuth');
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
router.post('/create', checkAdminRole, celebrate(statusSchems.code), createStatus);
router.put('/:id', checkAdminRole, celebrate(statusSchems.id), celebrate(statusSchems.code), updateStatus);
router.delete('/:id', checkAdminRole, celebrate(statusSchems.id), deleteStatus);

module.exports = router;