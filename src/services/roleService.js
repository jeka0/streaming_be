const roleAccess = require("../repositories/roleAccess");
async function createRole(data){
    const role = await roleAccess.createRole(data)

    if(!role){
        throw new Error("Error creating Role");
    }

    return role;
}

async function getRoleById(id){
    const role = await roleAccess.getRoleById(id);

    if(!role){
        throw new Error("Role not found");
    }

    return role;
}

async function getRoleByName(name){
    let role = await roleAccess.getRoleByName(name);

    if(!role){
        throw new Error("Role not found");
    }

    return role;
}

async function getAllRoles()
{
    return await roleAccess.getAllRoles()
}

async function getAllRolesByName(name){
    return await roleAccess.getAllRolesByName(name);
}

async function updateRole(id, data){
    const updatedRole = await roleAccess.updateRole(id, data);

    if(!updatedRole){
        throw new Error("Error updating Role");
    }

    return updatedRole;
}

async function deleteRole(id){
    const role = await roleAccess.getRoleById(id);
    
    if(!role){
      throw new Error("Role is not found");
    }

    return await roleAccess.deleteRole(id);
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