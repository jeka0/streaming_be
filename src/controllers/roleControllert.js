const roleService = require("../services/roleService");

async function createRole(req, res){
    const { name } = req.body;

    roleService.createRole({name})
    .then((role)=>{res.send(role)})
    .catch((err)=>res.status(400).send(err.message));
}

async function getRoleById(req, res){
    const { id } = req.params;

    roleService.getRoleById(id)
    .then((role)=>res.send(role))
    .catch((err)=>res.status(400).send(err.message));
}

async function getRoleByName(req, res){
    const { name } = req.body;

    roleService.getRoleByName(name)
    .then((role)=>res.send(role))
    .catch((err)=>res.status(400).send(err.message));
}

async function getAllRoles(req, res){
    roleService.getAllRoles()
    .then((roles)=>res.send(roles))
    .catch((err)=>res.status(400).send(err.message));
}

async function getAllRolesByName(req, res){
    const { name } = req.body;

    roleService.getAllRolesByName(name)
    .then((roles)=>res.send(roles))
    .catch((err)=>res.status(400).send(err.message));
}

async function updateRole(req, res){
    const { id } = req.params;
    const { name } = req.body;

    roleService.updateRole(id, { name })
    .then(()=>res.send({message: "OK"}))
    .catch((err)=>res.status(400).send(err.message));
}

async function deleteRole(req, res){
    const { id } = req.params;

    roleService.deleteRole(id)
    .then(()=>res.send({message: "OK"}))
    .catch((err)=>res.status(400).send(err.message));
}

module.exports = {
    createRole,
    getRoleById,
    getRoleByName,
    getAllRoles,
    getAllRolesByName,
    updateRole,
    deleteRole
};