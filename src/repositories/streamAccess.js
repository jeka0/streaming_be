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
        relations:['user', 'category'],
        order: {start_time: 'DESC'}
    });
}

async function getStreamByRecording(recording_file){
    return await streamRep.findOne({
        where:{
            recording_file
        }, 
        relations:['user', 'category'] 
    });
}

async function getStream(id){
    return await streamRep.findOne({
        where:{
            id 
        }, 
        relations:['user', 'category'] 
    });
}

async function getUserStreams(userId){
    return await streamRep.find({
        where:{
            user:{
                id:userId
            }
        },
        relations:['user', 'category'],
        order: {start_time: 'DESC'}
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
        relations:['user', 'category'],
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

async function getLiveRange(skip, take, order, category){
    const config = { 
        skip,
        take,
        where:{
            end_time: IsNull(),
        },
        relations:['user', 'category'],
        order: {start_time: order}
    }

    if(category) config.where.category = {
        name: category
    }

    const [result, total] = await streamRep.findAndCount(config);

    return {
        data: result,
        total
    }
}

async function getUserRange(userId, skip, take, order, category){
    const config = { 
        skip,
        take,
        where:{
            user:{
                id:userId
            }
        },
        relations:['user', 'category'],
        order: {start_time: order}
    }

    if(category) config.where.category = {
        name: category
    }

    const [result, total] = await streamRep.findAndCount(config);

    return {
        data: result,
        total
    }
}

async function getStreamRange(skip, take, order, category){
    const config = { 
        skip,
        take,
        relations:['user', 'category'],
        order: {start_time: order}
    }

    if(category) config.where = {
        category:{
            name: category
        }
    }

    const [result, total] = await streamRep.findAndCount(config);

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
    getLiveUserStreams,
    getStreamByRecording,
    getStreamRange
};