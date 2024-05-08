const router = require('express').Router();
const express = require('express');
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const chatRoutes = require("./chatRoutes");
const messageRoutes = require("./messageRoutes");
const streamRoutes = require("./streamRoutes.js");
const streamSettingsRoutes = require("./streamSettingsRoutes.js");
const typeRoutes = require("./typeRoutes.js");
const statusRoutes = require("./statusRoutes.js");
const penaltyRoutes = require("./penaltyRoutes.js");
const { checkAuth } = require('../middlewares/checkAuth.js');

router.use('/image', express.static('Images'));
router.use('/thumbnail', express.static('server/thumbnails'));
router.use('/live', express.static('server/media/live'));
router.use('/auth', authRoutes);
router.use('/user', checkAuth, userRoutes);
router.use('/chat', checkAuth, chatRoutes);
router.use('/message', checkAuth, messageRoutes);
router.use('/stream', checkAuth, streamRoutes);
router.use('/settings', checkAuth, streamSettingsRoutes);
router.use('/type', checkAuth, typeRoutes);
router.use('/status', checkAuth, statusRoutes);
router.use('/penalty', checkAuth, penaltyRoutes);

module.exports = router;