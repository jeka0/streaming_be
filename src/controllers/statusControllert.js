const statusService = require("../services/statusService");

async function createStatus(req, res){
    const { code } = req.body;

    statusService.createStatus({code})
    .then((status)=>{res.send(status)})
    .catch((err)=>res.status(400).send(err.message));
}

async function getStatusById(req, res){
    const { id } = req.params;

    statusService.getStatusById(id)
    .then((status)=>res.send(status))
    .catch((err)=>res.status(400).send(err.message));
}

async function getStatusByCode(req, res){
    const { code } = req.body;

    statusService.getStatusByCode(code)
    .then((status)=>res.send(status))
    .catch((err)=>res.status(400).send(err.message));
}

async function getAllStatuses(req, res){
    statusService.getAllStatuses()
    .then((statuss)=>res.send(statuss))
    .catch((err)=>res.status(400).send(err.message));
}

async function getAllStatusesByCode(req, res){
    const { code } = req.body;

    statusService.getAllStatusesByCode(code)
    .then((statuss)=>res.send(statuss))
    .catch((err)=>res.status(400).send(err.message));
}

async function updateStatus(req, res){
    const { id } = req.params;
    const { code } = req.body;

    statusService.updateStatus(id, { code })
    .then(()=>res.send({message: "OK"}))
    .catch((err)=>res.status(400).send(err.message));
}

async function deleteStatus(req, res){
    const { id } = req.params;

    statusService.deleteStatus(id)
    .then(()=>res.send({message: "OK"}))
    .catch((err)=>res.status(400).send(err.message));
}

module.exports = {
    createStatus,
    getStatusById,
    getStatusByCode,
    getAllStatuses,
    getAllStatusesByCode,
    updateStatus,
    deleteStatus
};