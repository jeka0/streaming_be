const router = require('express').Router();
const express = require('express');
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const chatRoutes = require("./chatRoutes");
const messageRoutes = require("./messageRoutes");
const streamRoutes = require("./streamRoutes.js");
const streamSettingsRoutes = require("./streamSettingsRoutes.js");
const typeRoutes = require("./typeRoutes.js");
const categoryRoutes = require("./categoryRoutes.js");
const tagRoutes = require("./tagRoutes.js");
const statusRoutes = require("./statusRoutes.js");
const penaltyRoutes = require("./penaltyRoutes.js");
const { checkAuth, checkAdminRole } = require('../middlewares/checkAuth.js');
const roleRoutes = require("./roleRoutes.js");

router.use('/image', express.static('Images'));
router.use('/thumbnail', express.static('server/thumbnails'));
router.use('/live', express.static('server/media/live'));
router.use('/auth', authRoutes);
router.use('/user', checkAuth, userRoutes);
router.use('/chat', checkAuth, chatRoutes);
router.use('/message', checkAuth, messageRoutes);
router.use('/stream', checkAuth, streamRoutes);
router.use('/settings', checkAuth, streamSettingsRoutes);
router.use('/category', checkAuth, categoryRoutes);
router.use('/tag', checkAuth, tagRoutes);
router.use('/penalty', checkAuth, checkAdminRole, penaltyRoutes);
router.use('/role', checkAuth, checkAdminRole, roleRoutes);
router.use('/type', checkAuth, checkAdminRole, typeRoutes);
router.use('/status', checkAuth, checkAdminRole, statusRoutes);

module.exports = router;