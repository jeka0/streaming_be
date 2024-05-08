const { getUserByLogin } = require('./userService');
const { joinUser, leaveUser } = require('./chatService');
const { createPenalty, getPenaltyByUserAndChat, updatePenalty } = require("./penaltyService");

const callCommand = async (command, userId , chatId)=>{
    const user = await getUserByLogin(command.userLogin);
    if(!user){
        throw new Error("User is not found");
    }
    const result = { type: command.command, userId: user.id };
    switch(command.command){
        case "mod":
            await joinUser(chatId, user, userId);
            result.message = `${user.login} has been assigned as a moderator`;
            break;
        case "unmod":
            await leaveUser(chatId, user, userId);
            result.message = `${user.login} was excluded from moderation`;
            break;
        case "ban":
            await createPenalty({ 
                ownerId: userId,
                userId: user.id,
                chatId,
                type: "ban",
                status: "active"
            });
            result.message = `User "${user.login}" was successfully banned`;
            break;
        case "unban":
            const pen = await getPenaltyByUserAndChat(user.id, chatId, {
                type: "ban",
                status: "active"
            });
            await updatePenalty(pen.id, userId, {status:"inactive"})
            result.message = `User "${user.login}" was successfully unbanned`;
            break;

    }
    return result;
}

module.exports = {
    callCommand
};