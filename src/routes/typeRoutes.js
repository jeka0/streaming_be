const router = require('express').Router();
const {celebrate} = require('celebrate');
const typeSchems = require("../validation/typeSchems")

const {
    createType,
    getTypeById,
    getTypeByCode,
    getAllTypes,
    getAllTypesByCode,
    updateType,
    deleteType
} = require('../controllers/typeControllert');

router.get('/all', getAllTypes);
router.get('/all/code', celebrate(typeSchems.code), getAllTypesByCode);
router.get('/code', celebrate(typeSchems.code), getTypeByCode);
router.get('/:id', celebrate(typeSchems.id), getTypeById);
router.post('/create', celebrate(typeSchems.code), createType);
router.put('/:id', celebrate(typeSchems.id), celebrate(typeSchems.code), updateType);
router.delete('/:id',  celebrate(typeSchems.id), deleteType);

module.exports = router;