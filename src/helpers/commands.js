const commands = ['mod', 'unmod', 'ban', 'unban', 'timeout', 'untimeout'];

const parseCommand = (message)=>{
    let isCommand = false;
    let userLogin, command, time;
    const trimMessage = message.trim();
    if(trimMessage[0] === '\\'){
        const strs = trimMessage.split(/[\\\s]+/);
        if(strs.length >= 3 && commands.some(str=>str===strs[1])){
            command = strs[1];
            userLogin = strs[2];
            if(command === 'timeout')time = strs[3];
            isCommand = true;
        }
    }

    return {
        isCommand,
        userLogin,
        command,
        time
    }
}

const parseTime = (time)=>{
    const values = 'smhd';
    let t = time.match(/\d+[smhd]?/);
    if(!t){
        throw new Error("Invalid time format!!!");
    }
    t = t.toString();
    let factor = t.substring(t.length-1);
    let number;
    if(values.includes(factor)){
        number = Number(t.substring(0, t.length-1));
    }else{
        factor = 's';
        number = Number(t);
    }
    return calculateDate({factor, number});
}

const calculateDate = ({number, factor})=>{
    let end_date = new Date();
    switch(factor){
        case 's':
            end_date.setSeconds(end_date.getSeconds()+number);
            break;
        case 'm':
            end_date.setMinutes(end_date.getMinutes()+number);
            break;
        case 'h':
            end_date.setHours(end_date.getHours()+number);
            break;
        case 'd':
            end_date.setDate(end_date.getDate()+number);
            break;
    }
    return end_date;
}

module.exports = {
    parseCommand,
    parseTime
}