const dbAccess = require("./DataSource")
const penaltyRep = dbAccess.AppDataSource.getRepository("Penalty");

async function createPenalty(penalty){
   return await penaltyRep.save(penalty)
}

async function getAllPenaltys(status, type){
    const config = {
        relations:['user', 'chat', 'type', 'status', 'owner'],
         order: {datetime: 'DESC'}
    }
    if(status || type){
        config.where = {};
        if(status) config.where.status = { code: status };
        if(type) config.where.type = { code: type };
    }

    return await penaltyRep.find(config);
}

async function getAllPenaltysByChat(chatId, status, type){
    const config = {
        where:{
            chat:{
                id: chatId
            }
        }, 
        relations:['user', 'chat', 'type', 'status', 'owner'],
        order: {datetime: 'DESC'}
   }

   if(status) config.where.status = { code: status };
   if(type) config.where.type = { code: type };
    
    return await penaltyRep.find(config);
}

async function getAllPenaltysByUser(userId){
    return await penaltyRep.find({
        where:{
            user:{
                id: userId
            }
        }, 
        relations:['user', 'chat', 'type', 'status', 'owner'],
        order: {datetime: 'DESC'}
   });
}

async function getAllPenaltysByUserAndChat(userId, chatId){
    return await penaltyRep.find({
        where:{
            user:{
                id: userId
            },
            chat:{
                id: chatId
            }
        }, 
        relations:['user', 'chat', 'type', 'status', 'owner'],
        order: {datetime: 'DESC'}
   });
}

async function getPenaltyById(id){
    return await penaltyRep.findOne({
        where:{
            id 
        }, 
        relations:['user', 'chat', 'type', 'status', 'owner'] 
    });
}

async function getPenaltyByUserAndChat(userId, chatId, status, type){
    const config = {
        where:{
            user:{
                id: userId
            },
            chat:{
                id: chatId
            }
        }, 
        relations:['user', 'chat', 'type', 'status', 'owner'] 
    }

    if(status) config.where.status = { code: status };
    if(type) config.where.type = { code: type };
    
    return await penaltyRep.findOne(config);
}

async function getPenaltyByUser(userId, status, type){
    const config = {
        where:{
            user:{
                id: userId
            }
        }, 
        relations:['user', 'chat', 'type', 'status', 'owner'] 
    }

    if(status) config.where.status = { code: status };
    if(type) config.where.type = { code: type };
    
    return await penaltyRep.findOne(config);
}

async function paginationPenalty(skip, take, data){
    const config = {
        where: data,
        skip,
        take,
        relations:['user', 'chat', 'type', 'status', 'owner'],
        order: {datetime: 'DESC'}
    }

    const [result, total] = await penaltyRep.findAndCount(config);

    return {
        data: result,
        total
    }
}

async function deletePenalty(id){
    return await penaltyRep.delete({
        id
    });
}

async function updatePenalty(id, data){
    return await penaltyRep.update({ id }, data)
}

module.exports = {
    createPenalty,
    getAllPenaltys,
    getAllPenaltysByChat,
    getAllPenaltysByUser,
    getAllPenaltysByUserAndChat,
    getPenaltyById,
    getPenaltyByUserAndChat,
    getPenaltyByUser,
    deletePenalty,
    updatePenalty,
    paginationPenalty
};