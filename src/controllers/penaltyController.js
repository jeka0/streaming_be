const penaltyService = require("../services/penaltyService");

async function createPenalty(req, res){
    const { id } = req.params;
    const { userId, type, status } = req.body;

    penaltyService.createPenalty({
        chatId: id,
        userId,
        type,
        status,
        ownerId: req.userId
    })
    .then((penalty)=>{res.send(penalty)})
    .catch((err)=>res.status(400).send(err.message));
}

async function getPenaltyById(req, res){
    const { id } = req.params;

    penaltyService.getPenaltyById(id)
    .then((penalty)=>res.send(penalty))
    .catch((err)=>res.status(400).send(err.message));
}

async function getPenaltyByUserAndChat(req, res){
    const { userId, chatId } = req.query;
    const { type, status } = req.body;

    penaltyService.getPenaltyByUserAndChat(userId, chatId, { type, status })
    .then((penalty)=>res.send(penalty))
    .catch((err)=>res.status(400).send(err.message));
}

async function getAllPenaltys(req, res){
    penaltyService.getAllPenaltys()
    .then((penalty)=>res.send(penalty))
    .catch((err)=>res.status(400).send(err.message));
}

async function getAllPenaltysByChat(req, res){
    const { id } = req.params;

    penaltyService.getAllPenaltysByChat(id)
    .then((penaltys)=>res.send(penaltys))
    .catch((err)=>res.status(400).send(err.message));
}

async function getAllPenaltysByUser(req, res){
    const { id } = req.params;

    penaltyService.getAllPenaltysByUser(id)
    .then((penaltys)=>res.send(penaltys))
    .catch((err)=>res.status(400).send(err.message));
}

async function getAllPenaltysByUserAndChat(req, res){
    const { userId, chatId } = req.query;

    penaltyService.getAllPenaltysByUserAndChat(userId, chatId)
    .then((penaltys)=>res.send(penaltys))
    .catch((err)=>res.status(400).send(err.message));
}

async function updatePenalty(req, res){
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.userId;

    penaltyService.updatePenalty(id, userId, { status })
    .then(()=>res.send({message: "OK"}))
    .catch((err)=>res.status(400).send(err.message));
}

async function deletePenalty(req, res){
    const { id } = req.params;
    const userId = req.userId;

    penaltyService.deletePenalty(id, userId)
    .then(()=>res.send({message: "OK"}))
    .catch((err)=>res.status(400).send(err.message));
}

async function checkGlobalPenlaty(req, res){
    const { id } = req.params;

    penaltyService.checkGlobalPenlaty(id, "GlobalBan")
    .then((result)=>res.send(result))
    .catch((err)=>res.status(400).send(err.message));
}

module.exports = {
    createPenalty,
    getPenaltyById,
    getPenaltyByUserAndChat,
    getAllPenaltys,
    getAllPenaltysByChat,
    getAllPenaltysByUser,
    getAllPenaltysByUserAndChat,
    updatePenalty,
    deletePenalty,
    checkGlobalPenlaty
};