const router = require('express').Router();
const {celebrate} = require('celebrate');
const chatSchems = require("../validation/chatSchems");

const { createChat, getAllChats, getUserChats, searchChat, deleteChat, updateChat, getChat, getChatByName, joinUser, leaveUser } = require('../controllers/chatController.js');

router.get('/all', getAllChats);
router.get('/:id', celebrate(chatSchems.id), getChat);
router.get('/user/:id', celebrate(chatSchems.id), getUserChats);
router.post('/join/:id', celebrate(chatSchems.id), joinUser);
router.post('/leave/:id', celebrate(chatSchems.id), leaveUser);
router.post('/', celebrate(chatSchems.getByName), getChatByName);
router.post('/search', celebrate(chatSchems.getByName), searchChat);
router.post('/create', celebrate(chatSchems.create), createChat)
router.put('/:id', celebrate(chatSchems.id), celebrate(chatSchems.update), updateChat);
router.delete('/:id', celebrate(chatSchems.id), deleteChat);


module.exports = router;