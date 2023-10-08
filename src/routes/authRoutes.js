const router = require('express').Router();
const {celebrate} = require('celebrate');
const authSchem = require("../validation/authSchems")

const {login,refresh,register} = require('../controllers/AuthController')
router.post('/login',celebrate(authSchem.login), login);
router.post('/register',celebrate(authSchem.register), register);
router.post('/refresh',celebrate(authSchem.refresh), refresh);

module.exports = router;