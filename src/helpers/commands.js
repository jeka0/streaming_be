const commands = ['mod', 'unmod', 'ban', 'unban'];

const parseCommand = (message)=>{
    let isCommand = false;
    let userLogin;
    let command;
    const trimMessage = message.trim();
    if(trimMessage[0] === '\\'){
        const strs = trimMessage.split(/[\\\s]+/);
        if(strs.length >= 3 && commands.some(str=>str===strs[1])){
            command = strs[1];
            userLogin = strs[2];
            isCommand = true;
        }
    }

    return {
        isCommand,
        userLogin,
        command
    }
}

module.exports = {
    parseCommand
}