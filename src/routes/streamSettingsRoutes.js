const router = require('express').Router();
const {celebrate} = require('celebrate');
const settingsSchem = require("../validation/streamSettingsSchems.js");

const {createSettings, getSettings, updateSettings, deleteSettings, getSettingsByUserId} = require('../controllers/streamSettingsController.js');

/*router.post('/create', celebrate(settingsSchem.create), createSettings);
router.get('/:id', celebrate(settingsSchem.id), getSettings);*/
router.get('/', getSettingsByUserId);
router.put('/',celebrate(settingsSchem.update), updateSettings);
//router.delete('/',  deleteSettings);


module.exports = router;