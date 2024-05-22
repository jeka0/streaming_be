const router = require('express').Router();
const {celebrate} = require('celebrate');
const roleSchems = require("../validation/roleSchems")

const {
    createRole,
    getRoleById,
    getRoleByName,
    getAllRoles,
    getAllRolesByName,
    updateRole,
    deleteRole
} = require('../controllers/roleControllert');

router.get('/all', getAllRoles);
router.get('/all/name', celebrate(roleSchems.name), getAllRolesByName);
router.get('/name', celebrate(roleSchems.name), getRoleByName);
router.get('/:id', celebrate(roleSchems.id), getRoleById);
router.post('/create', celebrate(roleSchems.name), createRole);
router.put('/:id', celebrate(roleSchems.id), celebrate(roleSchems.name), updateRole);
router.delete('/:id',  celebrate(roleSchems.id), deleteRole);

module.exports = router;