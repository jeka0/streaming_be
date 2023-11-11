const dbAccess = require("./DataSource")
const { IsNull } = require('typeorm')
const streamRep = dbAccess.AppDataSource.getRepository("Stream");

async function createStream(stream){
   return await streamRep.save(stream)
}

async function getLiveStreams(){
    return await streamRep.find({
        where:{
            end_time: IsNull()
        }, 
        relations:['user'],
        order: {id: 'DESC'}
    });
}

async function getStream(id){
    return await streamRep.findOne({
        where:{
            id 
        }, 
        relations:['user'] 
    });
}

async function getUserStreams(userId){
    return await streamRep.find({
        where:{
            user:{
                id:userId
            }
        },
        relations:['user'],
        order: {id: 'DESC'}
    });
}

async function getLiveUserStreams(userId){
    return await streamRep.find({
        where:{
            user:{
                id:userId
            },
            end_time: IsNull()
        },
        relations:['user'],
        order: {start_time: 'DESC'}
    });
}

async function deleteStream(id){
    return await streamRep.delete({
        id
    });
}

async function updateStream(id, data){
    return await streamRep.update({
        id
    }, data)
}

async function getLiveRange(skip, take){
    const [result, total] = await streamRep.findAndCount({ 
        skip,
        take,
        where:{
            end_time: null
        },
        relations:['user'],
        order: {id: 'DESC'}
    });

    return {
        data: result,
        total
    }
}

async function getUserRange(userId, skip, take){
    const [result, total] = await streamRep.findAndCount({ 
        skip,
        take,
        where:{
            user:{
                id:userId
            }
        },
        relations:['user'],
        order: {id: 'DESC'}
    });

    return {
        data: result,
        total
    }
}

module.exports = {
    createStream, 
    getStream, 
    getLiveStreams, 
    getUserStreams, 
    updateStream, 
    deleteStream,
    getLiveRange,
    getUserRange,
    getLiveUserStreams
};