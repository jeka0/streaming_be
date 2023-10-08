const router = require('express').Router();
const express = require('express');
const authRoutes = require("./authRoutes");
/*
const userRoutes = require("./userRoutes");
const postRoutes = require("./postRoutes");
const communityRoutes = require("./communityRoutes");
const chatRoutes = require("./chatRoutes");
const messageRoutes = require("./messageRoutes");
const skillRoutes = require("./skillRoutes");
const educationRoutes = require("./educationsRoutes");*/
const { checkAuth } = require('../middlewares/checkAuth.js');

router.use('/image', express.static('Images'));
router.use('/auth', authRoutes);
/*
router.use('/user', checkAuth, userRoutes);
router.use('/post', checkAuth, postRoutes);
router.use('/community', checkAuth, communityRoutes);
router.use('/chat', checkAuth, chatRoutes);
router.use('/message', checkAuth, messageRoutes);
router.use('/skill', checkAuth, skillRoutes);
router.use('/education', checkAuth, educationRoutes);*/

module.exports = router;