const server = require('http').createServer();
const { checkSocketAuth } = require('../middlewares/checkAuth');
const { createMessage, deleteMessage, updateMessage } = require('../services/messageService');
const { checkMessage } = require('../middlewares/messageValidation');
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
    createMessage(client.userId, chatId, {message} ).then((savedMessage)=>{
      io.to(chatId).emit("message", savedMessage);
    })
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
      client.emit("error", err);
    });
  });

  client.on("delete", ({chatId, id}) =>{
    deleteMessage(id, client.userId).then(()=>{
      io.to(chatId).emit("delete", id);
    }).catch(err=>{
      client.emit("error", err);
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