const adminService = require("../services/adminService");

async function globallyBanUser(req, res){
    const { id } = req.params;
    const userId = req.userId;

    adminService.globallyBanUser(userId, id)
    .then(()=>res.send({message: "OK"}))
    .catch((err)=>res.status(400).send(err.message));
}

async function globallyUnBanUser(req, res){
    const { id } = req.params;

    adminService.globallyUnBanUser(id)
    .then(()=>res.send({message: "OK"}))
    .catch((err)=>res.status(400).send(err.message));
}

async function addAdmin(req, res){
    const { id } = req.params;

    adminService.addAdmin(id)
    .then(()=>res.send({message: "OK"}))
    .catch((err)=>res.status(400).send(err.message));
}

async function removeAdmin(req, res){
    const { id } = req.params;
    const userId = req.userId;

    adminService.removeAdmin(id, userId)
    .then(()=>res.send({message: "OK"}))
    .catch((err)=>res.status(400).send(err.message));
}

async function getAllAdmins(req, res){
    const { page, limit } = req.query;

    adminService.getAllAdmins(page, limit)
    .then((result)=>res.send(result))
    .catch((err)=>res.status(400).send(err.message));
}

async function getAllBans(req, res){
    const { page, limit, status } = req.query;

    adminService.getAllBans(page, limit, status)
    .then((result)=>res.send(result))
    .catch((err)=>res.status(400).send(err.message));
}

module.exports = {
    globallyBanUser,
    globallyUnBanUser,
    addAdmin,
    removeAdmin,
    getAllAdmins,
    getAllBans
};