const router = require('express').Router();
const {celebrate} = require('celebrate');
const adminSchems = require("../validation/adminSchems")

const {
    globallyBanUser,
    globallyUnBanUser,
    addAdmin,
    removeAdmin,
    getAllAdmins,
    getAllBans
} = require('../controllers/adminController');

router.get('/all', celebrate(adminSchems.pagination), getAllAdmins);
router.get('/ban/all', celebrate(adminSchems.paginationBan), getAllBans);
router.get('/ban/:id', celebrate(adminSchems.id), globallyBanUser);
router.get('/unban/:id', celebrate(adminSchems.id), globallyUnBanUser);
router.get('/:id', celebrate(adminSchems.id), addAdmin);
router.delete('/:id', celebrate(adminSchems.id), removeAdmin);

module.exports = router;