const router = require('express').Router();
const {celebrate} = require('celebrate');
const streamSchems = require("../validation/streamSchems")

const {createStream, getStream, getLiveStreams, getCurrentUserStreams, getUserStreams, updateStream, deleteStream, getLiveRange, getUserRange, getLiveStreamByName, getStreamByRecording} = require('../controllers/streamController');

router.post('/', celebrate(streamSchems.create), createStream);
router.get('/live', getLiveStreams);
router.post('/live/name', celebrate(streamSchems.bodyName), getLiveStreamByName)
router.get('/streams', celebrate(streamSchems.pagination), getLiveRange)
router.get('/streams/user/:id', celebrate(streamSchems.pagination), celebrate(streamSchems.id), getUserRange)
router.get('/recording/:name', celebrate(streamSchems.name), getStreamByRecording);
router.get('/:id', celebrate(streamSchems.id), getStream);
router.get('/', getCurrentUserStreams);
router.get('/user/:id', celebrate(streamSchems.id), getUserStreams);
router.put('/:id', celebrate(streamSchems.id), celebrate(streamSchems.update), updateStream);
router.delete('/:id',  celebrate(streamSchems.id), deleteStream);

module.exports = router;