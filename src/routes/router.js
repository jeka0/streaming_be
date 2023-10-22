const router = require('express').Router();
const express = require('express');
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const chatRoutes = require("./chatRoutes");
const messageRoutes = require("./messageRoutes");
const { checkAuth } = require('../middlewares/checkAuth.js');

router.use('/image', express.static('Images'));
router.use('/auth', authRoutes);
router.use('/user', checkAuth, userRoutes);
router.use('/chat', checkAuth, chatRoutes);
router.use('/message', checkAuth, messageRoutes);

module.exports = router;