const penaltyAccess = require("../repositories/penaltyAccess");
const { getUserByID } = require("./userService");
const { getChatByID } = require("./chatService");
const { getStatusByCode } = require("./statusService");
const { getTypeByCode } = require("./typeService");
async function createPenalty(data){
    const checkPenalty = await penaltyAccess.getPenaltyByUserAndChat(data.userId, data.chatId, data?.status, data?.type);

    if(checkPenalty){
        throw new Error(`The ${data.type} has already been imposed!`);
    }

    const newPenalty = {
        datetime: new Date()
    }
    newPenalty.owner = await getUserByID(data.ownerId);
    newPenalty.user = await getUserByID(data.userId);
    newPenalty.chat = await getChatByID(data.chatId);
    newPenalty.type = await getTypeByCode(data.type);
    newPenalty.status = await getStatusByCode(data.status);

    if(!newPenalty.chat.users.some((u)=>u.id===data.ownerId) && data.ownerId !== newPenalty.chat.streamer.id){
        throw new Error("Access denied");
    }

    if(data.userId === data.ownerId){
        throw new Error("Error banning yourself");
    }

    if(data.userId === newPenalty.chat.streamer.id){
        throw new Error("Channel owner ban error");
    }

    const penalty = await penaltyAccess.createPenalty(newPenalty)

    if(!penalty){
        throw new Error("Error creating Penalty");
    }
    deleteInfo(penalty);

    return penalty;
}

async function getPenaltyById(id){
    const penalty = await penaltyAccess.getPenaltyById(id);

    if(!penalty){
        throw new Error("Penalty not found");
    }

    deleteInfo(penalty);

    return penalty;
}

async function checkPenalty(userId, chatId){
    const penalty = await penaltyAccess.getPenaltyByUserAndChat(userId, chatId, "active");

    if(penalty){
        switch(penalty.type.code){
            case "ban":
                throw new Error(`User ${penalty.user.login} is banned from this chat!!!`);
                break;
        }
    }

    return true;
}

async function getPenaltyByUserAndChat(userId, chatId, data){
    const penalty = await penaltyAccess.getPenaltyByUserAndChat(userId, chatId, data?.status, data?.type);

    if(!penalty){
        throw new Error("Penalty not found");
    }

    deleteInfo(penalty);

    return penalty;
}

async function getAllPenaltys()
{
    const penaltys = await penaltyAccess.getAllPenaltys()

    penaltys.forEach(deleteInfo);

    return penaltys;
}

async function getAllPenaltysByChat(chatId){
    const penaltys = await penaltyAccess.getAllPenaltysByChat(chatId);

    penaltys.forEach(deleteInfo);

    return penaltys;
}

async function getAllPenaltysByUser(userId){
    const penaltys = await penaltyAccess.getAllPenaltysByUser(userId);

    penaltys.forEach(deleteInfo);

    return penaltys;
}

async function getAllPenaltysByUserAndChat(userId, chatId){
    const penaltys = await penaltyAccess.getAllPenaltysByUserAndChat(userId, chatId);

    penaltys.forEach(deleteInfo);

    return penaltys;
}

async function updatePenalty(id, userId, data){
    const penalty = await penaltyAccess.getPenaltyById(id);

    if(!penalty){
        throw new Error("Penalty is not found");
    }

    penalty.chat = await getChatByID(penalty.chat.id);
    if(!penalty.chat.users.some((u)=>u.id===userId) && userId !== penalty.chat.streamer.id){
        throw new Error("Access denied");
    }
    data.status = await getStatusByCode(data.status);
    const updatedPenalty = await penaltyAccess.updatePenalty(id, data);

    if(!updatedPenalty){
        throw new Error("Error updating Penalty");
    }

    return updatedPenalty;
}

async function deletePenalty(id, userId){
    const penaltyR = await penaltyAccess.getPenaltyById(id);
    
    if(!penaltyR){
      throw new Error("Penalty is not found");
    }
    
    const penalty = await penaltyAccess.getPenaltyById(id);

    penalty.chat = await getChatByID(penalty.chat.id);
    if(!penalty.chat.users.some((u)=>u.id===userId) && userId !== penalty.chat.streamer.id){
        throw new Error("Access denied");
    }

    return await penaltyAccess.deletePenalty(id);
}

function deleteInfo(penalty){
    delete penalty.user.password;
    delete penalty.user.streamKey;
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
    checkPenalty
};