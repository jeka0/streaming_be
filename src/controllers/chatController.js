
const chatService = require("../services/chatService");
require('dotenv').config()

async function createChat(req, res){
    const { name, type, users } = req.body;

    chatService.createChat({name, type, users})
    .then(()=>res.send({message: "OK"}))
    .catch((err)=>res.status(400).send(err.message));
}

async function getAllChats(req, res){
    chatService.getAllChats()
    .then((chats)=>res.send(chats))
    .catch((err)=>res.status(400).send(err.message));
}

async function getUserChats(req, res){
    const { id } = req.params;

    chatService.getUserChats(id)
    .then((chat)=>res.send(chat))
    .catch((err)=>res.status(400).send(err.message));
}

async function searchChat(req, res){
    const { name } = req.body;

    chatService.searchChat(name)
    .then((chat)=>res.send(chat))
    .catch((err)=>res.status(400).send(err.message));
}

async function deleteChat(req, res){
    const { id } = req.params;

    chatService.deleteChat(id)
    .then(()=>res.send({message: "OK"}))
    .catch((err)=>res.status(400).send(err.message));
}

async function updateChat(req, res){
    const { name, type, users } = req.body;
    const { id } = req.params;

    chatService.updateChat(id, {name, type, users})
    .then(()=>res.send({message: "OK"}))
    .catch((err)=>res.status(400).send(err.message));
}

async function getChat(req, res){
    const { id } = req.params;

    chatService.getChatByID(id)
    .then((chat)=>res.send(chat))
    .catch((err)=>res.status(400).send(err.message));
}

async function getChatByName(req, res){
    const { name } = req.body;
    chatService.getChatByName(name)
    .then((chat)=>res.send(chat))
    .catch((err)=>res.status(400).send(err.message));
}

async function joinUser(req, res){
    const { id } = req.params;
    const userId = req.userId;

    chatService.joinUser(id, userId)
    .then((result)=>res.send(result))
    .catch((err)=>res.status(400).send(err.message));
}

async function leaveUser(req, res){
    const { id } = req.params;
    const userId = req.userId;

    chatService.leaveUser(id, userId)
    .then((result)=>res.send(result))
    .catch((err)=>res.status(400).send(err.message));
}

module.exports = {
    createChat,
    getAllChats,
    getUserChats,
    searchChat,
    deleteChat,
    updateChat,
    getChat,
    getChatByName,
    joinUser,
    leaveUser
};