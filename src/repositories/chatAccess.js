const dbAccess = require("./DataSource")
const { ILike } = require("typeorm");
const chatRep = dbAccess.AppDataSource.getRepository("Chat");

async function createChat(chat){
   return await chatRep.save(chat)
}

async function getAllChats(){
    return await chatRep.find({
        where:{
            type: "public"
        },
        relations:['users'] 
    })
}

async function getChatByID(id){
    return await chatRep.findOne({
        where:{
            id 
        }, 
        relations:['users', 'streamer'] 
    })
}


async function getUserChats(userId){
    return await chatRep.find({
        where:[
            {
                users:{
                    id: userId
                },
                type: "public"
            },
            {
                users:{
                    id: userId
                },
                type: "private"
            },
        ], 
        relations:['users'] 

    })
}


async function getChatByName(name){
    return await chatRep.findOne({
        where:{
            name
        }, 
        relations:['users'] 
    })
}

async function searchChat(text){
    return await chatRep.find({
        where:{
            name: ILike(`%${text}%`),
            type: "public"
        }
    })
}

async function deleteChat(id){
    return await chatRep.delete({ id });
}

async function updateChat(id, data){
    return await chatRep.update({ id }, data)
}

module.exports = {
    createChat,
    getAllChats,
    getUserChats,
    searchChat,
    getChatByID,
    getChatByName,
    deleteChat,
    updateChat
};