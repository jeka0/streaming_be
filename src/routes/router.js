const router = require('express').Router();
const express = require('express');
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const chatRoutes = require("./chatRoutes");
const messageRoutes = require("./messageRoutes");
const streamRoutes = require("./streamRoutes.js");
const { checkAuth } = require('../middlewares/checkAuth.js');

router.use('/image', express.static('Images'));
router.use('/thumbnail', express.static('server/thumbnails'));
router.use('/auth', authRoutes);
router.use('/user', checkAuth, userRoutes);
router.use('/chat', checkAuth, chatRoutes);
router.use('/message', checkAuth, messageRoutes);
router.use('/stream', checkAuth, streamRoutes);

module.exports = router;