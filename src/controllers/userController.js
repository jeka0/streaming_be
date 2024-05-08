
const userService = require("../services/userService");
require('dotenv').config()

async function deleteUser(req, res){
    const userId = req.userId;

    userService.deleteCurrentUser(userId)
    .then(()=>res.send({message: "OK"}))
    .catch((err)=>res.status(400).send(err.message));
}

async function updateUser(req, res){
    const { login, password, image } = req.body;
    const userId = req.userId;

    userService.updateCurrentUser(userId, {login, password, image})
    .then(()=>res.send({message: "OK"}))
    .catch((err)=>res.status(400).send(err.message));
}

async function generateNewStreamKey(req, res){
    const userId = req.userId;

    userService.generateNewStreamKey(userId)
    .then(()=>res.send({message: "OK"}))
    .catch((err)=>res.status(400).send(err.message));
}

async function getUser(req, res){
    const { id } = req.params;

    userService.getUserByID(id)
    .then((user)=>{
        const { password, streamKey, ...userData } = user;

        res.send(userData);
    }).catch((err)=>res.status(400).send(err.message));
}

async function getUserByLogin(req, res){
    const { login } = req.body;

    userService.getUserByLogin(login)
    .then((user)=>{
        const { password, streamKey, ...userData } = user;

        res.send(userData);
    }).catch((err)=>res.status(400).send(err.message));
}

async function getCurrentUser(req, res){
    const userId = req.userId;
    userService.getUserByID(userId)
    .then((user)=>{
        const { password, ...userData } = user;

        res.send(userData);
    }).catch((err)=>res.status(400).send(err.message));
}

async function getAllUsers(req, res){
    userService.getAllUsers()
    .then((results)=>res.send(results))
    .catch((err)=>res.status(400).send(err.message));
}

async function searchUser(req, res){
    const { name } = req.body;

    userService.searchUser(name)
    .then((results)=>res.send(results))
    .catch((err)=>res.status(400).send(err.message));
}

async function followToUser(req, res){
    const { id } = req.params;
    const userId = req.userId;

    userService.followToUser(id, userId)
    .then((results)=>res.send(results))
    .catch((err)=>res.status(400).send(err.message));
}

async function unfollowFromUser(req, res){
    const { id } = req.params;
    const userId = req.userId;

    userService.unfollowFromUser(id, userId)
    .then((results)=>res.send(results))
    .catch((err)=>res.status(400).send(err.message));
}

module.exports = {
    getAllUsers,
    getCurrentUser,
    searchUser,
    getUser,
    updateUser,
    deleteUser,
    getUserByLogin,
    followToUser,
    unfollowFromUser,
    generateNewStreamKey
};