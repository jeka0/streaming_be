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
    const query = streamRep.createQueryBuilder('stream')
        .leftJoinAndSelect('stream.user', 'user')
        .leftJoinAndSelect('stream.category', 'category')
        .skip(skip)
        .take(take)
        .orderBy('stream.start_time', order);

    if (category) {
        query.andWhere('category.name = :category', { category });
    }

    query.andWhere(qb => {
        const subQuery = qb.subQuery()
            .select('penalty.id')
            .from('penalty', 'penalty')
            .leftJoinAndSelect('penalty.status', 'status')
            .where('penalty.user_id = user.id')
            .andWhere('status.code = :activeStatus')
            .getQuery();
        return `NOT EXISTS (${subQuery})`;
    }).setParameter('activeStatus', 'active');

    const [result, total] = await query.getManyAndCount();

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