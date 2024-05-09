const { getUserByLogin } = require('./userService');
const { joinUser, leaveUser } = require('./chatService');
const { createPenalty, getPenaltyByUserAndChat, updatePenalty } = require("./penaltyService");
const { parseTime } = require("../helpers/commands");
const { formatToString } = require("../helpers/dateFormat");

const callCommand = async (command, userId , chatId)=>{
    if(
        !command.command || 
        !command.userLogin || 
        (command.command==='timeout' && !command.time)
    ){
        throw new Error('Invalid command format');
    }
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
        case "timeout":
            const time = parseTime(command.time);
            await createPenalty({ 
                ownerId: userId,
                userId: user.id,
                chatId,
                type: "timeout",
                status: "active",
                time
            });
            result.time = time;
            result.message = `User "${user.login}" timeouted until ${formatToString(time)}`;
            break;
        case "untimeout":
            const penT = await getPenaltyByUserAndChat(user.id, chatId, {
                type: "timeout",
                status: "active"
            });
            await updatePenalty(penT.id, userId, {status:"inactive"})
            result.message = `User "${user.login}" was successfully untimeouted`;
            break;
        default:
            throw new Error("Unknown command in chat");

    }
    return result;
}

module.exports = {
    callCommand
};