const { getUserByLogin } = require('./userService');
const { joinUser, leaveUser } = require('./chatService');
const { createPenalty, getPenaltyByUserAndChat, updatePenalty } = require("./penaltyService");

const callCommand = async (command, userId , chatId)=>{
    const user = await getUserByLogin(command.userLogin);
    if(!user){
        throw new Error("User is not found");
    }

    switch(command.command){
        case "mod":
            await joinUser(chatId, user, userId);
            return `${user.login} has been assigned as a moderator`;
        case "unmod":
            await leaveUser(chatId, user, userId);
            return `${user.login} was excluded from moderation`;
        case "ban":
            await createPenalty({ 
                ownerId: userId,
                userId: user.id,
                chatId,
                type: "ban",
                status: "active"
            });
            return `User "${user.login}" was successfully banned`;
        case "unban":
            const pen = await getPenaltyByUserAndChat(user.id, chatId, {
                type: "ban",
                status: "active"
            });
            await updatePenalty(pen.id, userId, {status:"inactive"})
            return `User "${user.login}" was successfully unbanned`;

    }
}

module.exports = {
    callCommand
};