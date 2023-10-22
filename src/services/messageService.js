const messageAccess = require("../repositories/messageAccess");
const { getUserByID } = require("./userService");
const { getChatByID } = require("./chatService");
async function createMessage(userId, chatId, data){
    data.datetime = new Date();
    data.user = await getUserByID(userId);
    data.chat = await getChatByID(chatId);

    const message = await messageAccess.createMessage(data)

    if(!message){
        throw new Error("Error creating Message");
    }
    deleteInfo(message);

    return message;
}

async function getMessage(id){
    const message = await messageAccess.getMessage(id);

    if(!message){
        throw new Error("Message not found");
    }

    deleteInfo(message);

    return message;
}

async function getAllMessages()
{
    const messages = await messageAccess.getAllMessages()

    messages.forEach(deleteInfo);

    return messages;
}

async function getAllMessagesByChat(chatId){
    const messages = await messageAccess.getAllMessagesByChat(chatId);

    messages.forEach(deleteInfo);

    return messages;
}

async function updateMessage(id, userId, data){
    const messages = await messageAccess.getMessage(id);

    if(messages.user.id !== userId){
        throw new Error("Access denied");
    }

    const updatedMessage = await messageAccess.updateMessage(messages, data);

    if(!updatedMessage){
        throw new Error("Error updating Message");
    }
    deleteInfo(updatedMessage);

    return updatedMessage;
}

async function deleteMessage(id, userId){
    const messages = await messageAccess.getMessage(id);

    if(messages.user.id !== userId){
        throw new Error("Access denied");
    }

    const deletedMessage = await messageAccess.deleteMessage(id);

    if(!deletedMessage){
        throw new Error("Error deleting Message");
    }

    return deletedMessage;
}

async function pagination(page, limit){
    const skip= (page-1) * limit;
    const result = await messageAccess.getRange(skip, limit);

    result.data.forEach(deleteInfo);

    return result;
}

function deleteInfo(message){
    delete message.user.password;
}


module.exports = {
    createMessage,
    getAllMessagesByChat,
    getMessage,
    getAllMessages,
    updateMessage,
    deleteMessage,
    pagination
};