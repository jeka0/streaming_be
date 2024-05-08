const server = require('http').createServer();
const { checkSocketAuth } = require('../middlewares/checkAuth');
const { createMessage, deleteMessage, updateMessage } = require('../services/messageService');
const { parseCommand } = require('../helpers/commands');
const { checkMessage } = require('../middlewares/messageValidation');
const { callCommand } = require('../services/commandService');
const { checkPenalty } = require('../services/penaltyService');
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
    console.log(info);
    if(info.isCommand){
      callCommand(info, client.userId, chatId).then((result)=>{
        client.emit("info", { message: result, chatId});
      }).catch(err=>{
        client.emit("fail",  { message: err.message, chatId});
      });
    }else{
      checkPenalty(client.userId, chatId)
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
    updateMessage(id, client.userId, { message }).then((updatedMessage)=>{
      io.to(chatId).emit("update", updatedMessage);
    }).catch(err=>{
      client.emit("error", err.message);
    });
  });

  client.on("delete", ({chatId, id}) =>{
    console.log({chatId, id})
    deleteMessage(id, client.userId).then(()=>{
      io.to(chatId).emit("delete", {chatId, id});
    }).catch(err=>{
      client.emit("error", err.message);
    })
  });

  client.use(checkMessage);

  client.on('error', err=>{
    client.emit("error", err);
  })
});

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

module.exports ={
  server,
  sendStartAlert,
  sendEndAlert,
  sendViewers
};