const { getUserByLogin } = require('./userService');
const { joinUser, leaveUser } = require('./chatService');

const callCommand = async (command, streamerId , chatId)=>{
    const user = await getUserByLogin(command.userLogin);
    if(!user){
        throw new Error("User is not found");
    }

    switch(command.command){
        case "mod":
            return joinUser(chatId, user, streamerId);
        case "unmod":
            return leaveUser(chatId, user, streamerId);
    }
}

module.exports = {
    callCommand
};