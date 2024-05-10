const streamAccess = require("../repositories/streamAccess");
const { getUserByID, getUserByLogin } = require("./userService");
const { getCategoryByName } = require("./categoryService");

async function createStream(userId, data){
    data.start_time = new Date();
    if(data.categoryName){
        data.category = await getCategoryByName(data.categoryName);
        delete data.categoryName;
    }
    data.user = await getUserByID(userId);
    await streamAccess.createStream(data);
}

async function finishStream(userId){
    const streams = await streamAccess.getLiveUserStreams(userId);
    streams.forEach((stream)=>{
        streamAccess.updateStream(stream.id, { end_time: new Date() });
    })

}

async function getStream(id){
    const stream = await streamAccess.getStream(id);

    if(!stream){
        throw new Error("Stream not found");
    }

    deleteInfo(stream);

    return stream;
}

async function getStreamByRecording(recording){
    const stream = await streamAccess.getStreamByRecording(recording + '.mp4');

    if(!stream){
        throw new Error("Stream not found");
    }

    deleteInfo(stream);

    return stream;
}

async function getLiveStreams()
{
    const streams = await streamAccess.getLiveStreams()

    streams.forEach(deleteInfo);

    return streams;
}

async function getLiveStreamByLogin(login){
    const user = await getUserByLogin(login);
    const streams = await streamAccess.getLiveUserStreams(user.id);
    if(streams.length === 0){
        throw new Error("Stream not found");
    }

    deleteInfo(streams[0]);

    return streams[0];
}

async function getLiveStreamByUserId(userId){
    const user = await getUserByID(userId);
    const streams = await streamAccess.getLiveUserStreams(user.id);
    if(streams.length === 0){
        throw new Error("Stream not found");
    }

    deleteInfo(streams[0]);

    return streams[0];
}

async function getUserStreams(id){
    const streams = await streamAccess.getUserStreams(id)

    streams.forEach(deleteInfo);

    return streams;
}

async function update(stream){
    return await streamAccess.createStream(stream)
}

async function updateStream(id, userId, data){
    const stream = await streamAccess.getStream(id);

    if(stream.user.id !== userId){
        throw new Error("Access denied");
    }
    if(data.categoryName){
        data.category = await getCategoryByName(data.categoryName);
        delete data.categoryName;
    }
    const updatedStream = await streamAccess.updateStream(id, data);

    if(!updatedStream){
        throw new Error("Error updating stream");
    }

    return updatedStream;
}

async function deleteStream(id, userId){
    const stream = await streamAccess.getStream(id);

    if(stream.user.id !== userId){
        throw new Error("Access denied");
    }

    const deletedStream = await streamAccess.deleteStream(id);

    if(!deletedStream){
        throw new Error("Error deleting stream");
    }

    return deletedStream;
}

async function paginationLive(page, limit){
    const skip= (page-1) * limit;
    const result = await streamAccess.getLiveRange(skip, limit);

    result.data.forEach(deleteInfo);

    return result;
}

async function paginationUser(userId, page, limit){
    const skip= (page-1) * limit;
    const result = await streamAccess.getUserRange(userId, skip, limit);

    result.data.forEach(deleteInfo);

    return result;
}


function deleteInfo(stream){
    delete stream.user.password;
    delete stream.user.streamKey;
}

module.exports = {
    createStream, 
    getStream, 
    getLiveStreams, 
    getUserStreams, 
    updateStream, 
    deleteStream,
    paginationLive,
    paginationUser,
    finishStream,
    getLiveStreamByLogin,
    getStreamByRecording,
    update,
    getLiveStreamByUserId
};