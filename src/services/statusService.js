const statusAccess = require("../repositories/statusAccess");
async function createStatus(data){
    const status = await statusAccess.createStatus(data)

    if(!status){
        throw new Error("Error creating Status");
    }

    return status;
}

async function getStatusById(id){
    const status = await statusAccess.getStatusById(id);

    if(!status){
        throw new Error("Status not found");
    }

    return status;
}

async function getStatusByCode(code){
    let status = await statusAccess.getStatusByCode(code);

    if(!status){
        status = createStatus({ code });
    }

    return status;
}

async function getAllStatuses()
{
    return await statusAccess.getAllStatuses()
}

async function getAllStatusesByCode(code){
    return await statusAccess.getAllStatusesByCode(code);
}

async function updateStatus(id, data){
    const updatedStatus = await statusAccess.updateStatus(id, data);

    if(!updatedStatus){
        throw new Error("Error updating Status");
    }

    return updatedStatus;
}

async function deleteStatus(id){
    const status = await statusAccess.getStatusById(id);
    
    if(!status){
      throw new Error("Status is not found");
    }

    return await statusAccess.deleteStatus(id);
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