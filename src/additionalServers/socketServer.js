const server = require('http').createServer();
const { checkSocketAuth } = require('../middlewares/checkAuth');
const { createMessage, deleteMessage, updateMessage } = require('../services/messageService');
const { parseCommand } = require('../helpers/commands');
const { checkMessage } = require('../middlewares/messageValidation');
const { callCommand } = require('../services/commandService');
const { checkPenalty, getPenaltyByUserAndChat, getAllPenaltys, update, checkGlobalPenlaty } = require('../services/penaltyService');
require('dotenv').config();
const CORS_ORIGIN = process.env.CORS_ORIGIN;
const io = require("socket.io")(server, {
    cors: {
      origin: CORS_ORIGIN,
      methods: ["GET", "POST"]
    }
});
io.use(checkSocketAuth);

io.on('connection', client => {
  client.on("message", ({ chatId, message }) =>{
    const info = parseCommand(message);
    if(info.isCommand){
      checkBan(client.userId).then(()=>{
        return callCommand(info, client.userId, chatId)
      })
      .then((result)=>{
        if(result.type === "timeout")timeoutsManager();
        userInChat(chatId, result.userId, result.type, result.time);
        client.emit("info", { message: result.message, chatId});
      }).catch(err=>{
        client.emit("fail",  { message: err.message, chatId});
      });
    }else{
      checkBan(client.userId).then(()=>{
        return checkPenalty(client.userId, chatId)
      })
      .then(()=>createMessage(client.userId, chatId, {message}))
      .then((savedMessage)=>{
        io.to(chatId).emit("message", savedMessage);
      }).catch(err=>{
        client.emit("fail",  { message: err.message, chatId});
      });
    }
  });

  client.on('join', (chatId) => {
    client.join(chatId);
    getPenaltyByUserAndChat(client.userId, chatId, {status: "active"})
    .then(penalty=>userInChat(chatId,client.userId, penalty.type.code, penalty.end_time))
    .catch((err)=>{});
  });

  client.on('leave', (chatId)=>{
    client.leave(chatId);
  });

  client.on('joinRange', (range)=>{
    range.forEach(element => {
      if(element.login)client.join(element.login);
    });
  });

  client.on('leaveRange', (range)=>{
    range.forEach(element => {
      if(element.login)client.leave(element.login);
    });
  });

  client.on("update", ({ chatId, message, id }) =>{
    checkBan(client.userId).then(()=>{
      return updateMessage(id, client.userId, { message })
    })
    .then((updatedMessage)=>{
      io.to(chatId).emit("update", updatedMessage);
    }).catch(err=>{
      client.emit("fail",  { message: err.message, chatId});
    });
  });

  client.on("delete", ({chatId, id}) =>{
    checkBan(client.userId).then(()=>{
      return deleteMessage(id, client.userId)
    })
    .then(()=>{
      io.to(chatId).emit("delete", {chatId, id});
    }).catch(err=>{
      client.emit("fail",  { message: err.message, chatId});
    })
  });

  client.use(checkMessage);

  client.on('error', err=>{
    client.emit("error", err);
  })
});

const checkBan =async (userId)=>{
  const result = await checkGlobalPenlaty(userId, "GlobalBan");
  if(result){
    throw new Error("User banned from the platform");
  }
  return result;
}

const userInChat = (chatId, userId, type, time)=>{
  io.to(chatId).emit(type, {userId, chatId, time});
}

const sendViewers = (stream)=>{
  console.log(`${stream.user.login}/live`)
  io.to(`${stream.user.login}/live`).emit("viewer_count", {id: stream.id, viewer_count: stream.viewer_count});
}

const sendStartAlert = (user)=>{
  io.to(user.login).emit("startAlert", user);
}

const sendEndAlert = (user)=>{
  io.to(user.login).emit("endAlert", user);
}

var timeout;

async function timeoutsManager(){
  if(timeout) {clearTimeout(timeout); timeout = undefined}
  const penaltys = await getAllPenaltys("active", "timeout");
  const now = new Date();
  let minTime = undefined;
  penaltys.forEach(penalty=>{
      if(now.getTime()>=penalty.end_time.getTime()){
          update(penalty.id, {status:"inactive"})
          .then(()=>{
              userInChat(penalty.chat.id, penalty.user.id, "untimeout", penalty.end_time)
          });
      }else{
        if(minTime){
          if(minTime.getTime() > penalty.end_time.getTime()) minTime = penalty.end_time
        }else {
          minTime = penalty.end_time
        }
      }
  })
  if(minTime)timeout = setTimeout(timeoutsManager, minTime.getTime()-now.getTime()+100);
}

module.exports ={
  server,
  sendStartAlert,
  sendEndAlert,
  sendViewers,
  userInChat,
  timeoutsManager
};