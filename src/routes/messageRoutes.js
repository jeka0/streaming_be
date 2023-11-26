const router = require('express').Router();
const {celebrate} = require('celebrate');
const messageSchems = require("../validation/messageSchems")

const {createMessage, getMessage, getAllMessages, getAllMessagesByChat, updateMessage, deleteMessage, getRange} = require('../controllers/messageController');

router.get('/all', getAllMessages);
router.get('/chat/:id', getAllMessagesByChat);
router.get('/messages', celebrate(messageSchems.pagination), getRange)
router.get('/:id', celebrate(messageSchems.id), getMessage);
router.post('/create/:id', celebrate(messageSchems.id), celebrate(messageSchems.update), createMessage);
router.put('/:id', celebrate(messageSchems.id), celebrate(messageSchems.update), updateMessage);
router.delete('/:id',  celebrate(messageSchems.id), deleteMessage);

module.exports = router;