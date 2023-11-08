const router = require('express').Router();
const {celebrate} = require('celebrate');
const streamSchems = require("../validation/streamSchems")

const {createStream, getStream, getLiveStreams, getCurrentUserStreams, getUserStreams, updateStream, deleteStream, getLiveRange, getUserRange, getUserLiveStream} = require('../controllers/streamController');

router.post('/', celebrate(streamSchems.create), createStream);
router.get('/live', getLiveStreams);
router.get('/live/user/:id',celebrate(streamSchems.id), getUserLiveStream)
router.get('/streams', celebrate(streamSchems.pagination), getLiveRange)
router.get('/streams/user/:id', celebrate(streamSchems.pagination), celebrate(streamSchems.id), getUserRange)
router.get('/:id', celebrate(streamSchems.id), getStream);
router.get('/', getCurrentUserStreams);
router.get('/user/:id', celebrate(streamSchems.id), getUserStreams);
router.put('/:id', celebrate(streamSchems.id), celebrate(streamSchems.update), updateStream);
router.delete('/:id',  celebrate(streamSchems.id), deleteStream);

module.exports = router;