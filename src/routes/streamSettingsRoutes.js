const router = require('express').Router();
const {celebrate} = require('celebrate');
const settingsSchem = require("../validation/streamSettingsSchems.js");
const { checkAdminRole } = require("../middlewares/checkAuth");

const {createSettings, getSettings, updateSettings, deleteSettings, getSettingsByUserId} = require('../controllers/streamSettingsController.js');

router.post('/create', checkAdminRole, celebrate(settingsSchem.create), createSettings);
router.get('/:id', checkAdminRole, celebrate(settingsSchem.id), getSettings);
router.get('/', getSettingsByUserId);
router.put('/',celebrate(settingsSchem.update), updateSettings);
router.delete('/', checkAdminRole, deleteSettings);


module.exports = router;