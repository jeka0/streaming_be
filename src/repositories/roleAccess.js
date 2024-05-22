const dbAccess = require("./DataSource")
const roleRep = dbAccess.AppDataSource.getRepository("Role");

async function createRole(role){
   return await roleRep.save(role)
}

async function getAllRoles(){
    return await roleRep.find();
}

async function getAllRolesByName(name){
    return await roleRep.find({
        where:{
            name
        },
   });
}

async function getRoleById(id){
    return await roleRep.findOne({
        where:{
            id 
        },
    });
}

async function getRoleByName(name){
    return await roleRep.findOne({
        where:{
            name
        },
    });
}

async function deleteRole(id){
    return await roleRep.delete({
        id
    });
}

async function updateRole(id, data){
    return await roleRep.update({ id }, data)
}

module.exports = {
    createRole,
    getAllRoles,
    getAllRolesByName,
    getRoleById,
    getRoleByName,
    deleteRole,
    updateRole
};