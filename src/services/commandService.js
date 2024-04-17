const { getUserByLogin } = require('./userService');
const { joinUser, leaveUser } = require('./chatService');

const callCommand = async (command, streamerId , chatId)=>{
    const user = await getUserByLogin(command.userLogin);
    if(!user){
        throw new Error("User is not found");
    }

    switch(command.command){
        case "mod":
            await joinUser(chatId, user, streamerId);
            return `${user.login} has been assigned as a moderator`;
        case "unmod":
            await leaveUser(chatId, user, streamerId);
            return `${user.login} was excluded from moderation`;
    }
}

module.exports = {
    callCommand
};