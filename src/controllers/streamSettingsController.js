
const settingsService = require("../services/streamSettingsService");
const streamSevice = require("../services/streamService");
require('dotenv').config()

async function createSettings(req, res){
    const { stream_title, category } = req.body;
    const userId = req.userId;

    settingsService.createSettings(userId, {stream_title, category})
    .then(()=>res.send({message: "OK"}))
    .catch((err)=>res.status(400).send(err.message));
}

async function deleteSettings(req, res){
    const userId = req.userId;

    settingsService.getSettingsByUserId(userId).then((settings)=>
    settingsService.deleteSettings(settings.id))
    .then(()=>res.send({message: "OK"}))
    .catch((err)=>res.status(400).send(err.message));
}

async function updateSettings(req, res){
    const { stream_title, category } = req.body;
    const userId = req.userId;

    streamSevice.getLiveStreamByUserId(userId).then((stream)=>
        streamSevice.updateStream(stream.id, userId, { stream_title, categoryName: category })
    ).catch((err)=>{console.log(err)});
    settingsService.getSettingsByUserId(userId).then((settings)=>
     settingsService.updateSettings(settings.id, {stream_title, category}))
    .then(()=>res.send({message: "OK"}))
    .catch((err)=>res.status(400).send(err.message));
}

async function getSettings(req, res){
    const { id } = req.params;

    settingsService.getSettingsByID(id)
    .then((settings)=>{res.send(settings);
    }).catch((err)=>res.status(400).send(err.message));
}

async function getSettingsByUserId(req, res){
    const userId = req.userId;

    settingsService.getSettingsByUserId(userId)
    .then((settings)=>{res.send(settings);
    }).catch((err)=>res.status(400).send(err.message));
}

module.exports = {
    createSettings,
    getSettings,
    updateSettings,
    deleteSettings,
    getSettingsByUserId,
};