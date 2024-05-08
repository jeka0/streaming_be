const typeService = require("../services/typeService");

async function createType(req, res){
    const { code } = req.body;

    typeService.createType({code})
    .then((type)=>{res.send(type)})
    .catch((err)=>res.status(400).send(err.message));
}

async function getTypeById(req, res){
    const { id } = req.params;

    typeService.getTypeById(id)
    .then((type)=>res.send(type))
    .catch((err)=>res.status(400).send(err.message));
}

async function getTypeByCode(req, res){
    const { code } = req.body;

    typeService.getTypeByCode(code)
    .then((type)=>res.send(type))
    .catch((err)=>res.status(400).send(err.message));
}

async function getAllTypes(req, res){
    typeService.getAllTypes()
    .then((types)=>res.send(types))
    .catch((err)=>res.status(400).send(err.message));
}

async function getAllTypesByCode(req, res){
    const { code } = req.body;

    typeService.getAllTypesByCode(code)
    .then((types)=>res.send(types))
    .catch((err)=>res.status(400).send(err.message));
}

async function updateType(req, res){
    const { id } = req.params;
    const { code } = req.body;

    typeService.updateType(id, { code })
    .then(()=>res.send({message: "OK"}))
    .catch((err)=>res.status(400).send(err.message));
}

async function deleteType(req, res){
    const { id } = req.params;

    typeService.deleteType(id)
    .then(()=>res.send({message: "OK"}))
    .catch((err)=>res.status(400).send(err.message));
}

module.exports = {
    createType,
    getTypeById,
    getTypeByCode,
    getAllTypes,
    getAllTypesByCode,
    updateType,
    deleteType
};