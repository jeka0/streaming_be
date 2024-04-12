const streamSevice = require("../services/streamService");

async function createStream(req, res){
    const { stream_title, category } = req.body;
    const userId = req.userId;

    streamSevice.createStream( userId, { stream_title, category })
    .then(()=>res.send({message: "OK"}))
    .catch((err)=>res.status(400).send(err.message));
}

async function getStreamByRecording(req, res){
    const { name } = req.params;

    streamSevice.getStreamByRecording(name)
    .then((stream)=>res.send(stream))
    .catch((err)=>res.status(400).send(err.message));
}

async function getStream(req, res){
    const { id } = req.params;

    streamSevice.getStream(id)
    .then((stream)=>res.send(stream))
    .catch((err)=>res.status(400).send(err.message));
}

async function getLiveStreamByName(req, res){
    const { name } = req.body;

    streamSevice.getLiveStreamByLogin(name)
    .then((stream)=>res.send(stream))
    .catch((err)=>res.status(400).send(err.message));
}

async function getLiveStreams(req, res){
    streamSevice.getLiveStreams()
    .then((streams)=>res.send(streams))
    .catch((err)=>res.status(400).send(err.message));
}

async function getCurrentUserStreams(req, res){
    const userId = req.userId;

    streamSevice.getUserStreams(userId)
    .then((streams)=>res.send(streams))
    .catch((err)=>res.status(400).send(err.message));
}

async function getUserStreams(req, res){
    const { id } = req.params;

    streamSevice.getUserStreams(id)
    .then((streams)=>res.send(streams))
    .catch((err)=>res.status(400).send(err.message));
}

async function updateStream(req, res){
    const { id } = req.params;
    const { stream_title, category } = req.body;
    const userId = req.userId;

    streamSevice.updateStream(id, userId, { stream_title, category })
    .then(()=>res.send({message: "OK"}))
    .catch((err)=>res.status(400).send(err.message));
}

async function deleteStream(req, res){
    const { id } = req.params;
    const userId = req.userId;

    streamSevice.deleteStream(id, userId)
    .then(()=>res.send({message: "OK"}))
    .catch((err)=>res.status(400).send(err.message));
}

async function getLiveRange(req, res){
    const { page, limit } = req.query;

    streamSevice.paginationLive(page, limit)
    .then((result)=>res.send(result))
    .catch((err)=>res.status(400).send(err.message));
}

async function getUserRange(req, res){
    const { page, limit } = req.query;
    const { id } = req.params;

    streamSevice.paginationUser(id, page, limit)
    .then((result)=>res.send(result))
    .catch((err)=>res.status(400).send(err.message));
}

module.exports = { 
    createStream, 
    getStream, 
    getLiveStreams, 
    getCurrentUserStreams, 
    getUserStreams, 
    updateStream, 
    deleteStream,
    getLiveRange,
    getUserRange,
    getLiveStreamByName,
    getStreamByRecording
};