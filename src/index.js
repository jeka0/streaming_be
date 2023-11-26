var express = require('express');
const { server } = require('./additionalServers/socketServer');
const router = require("./routes/router.js");
const bodyParser = require('body-parser');
const { AppDataSource } = require("./repositories/DataSource.js")
const node_media_server = require('./additionalServers/media_server');
//const thumbnail_generator = require('./additionalServers/thumbnails.js')
require('dotenv').config();
const { errors } = require('celebrate');
const cors = require('cors');
const SERVER_PORT = process.env.SERVER_PORT;
const SOCKET_PORT = process.env.SOCKET_PORT;
const CORS_ORIGIN = process.env.CORS_ORIGIN;

var app = express();

app.use(cors({credentials: true, origin: CORS_ORIGIN}));
app.use(bodyParser.json());
app.use('/api', router);
app.use(errors());

AppDataSource.initialize().then(()=>{
  console.log("Database connected successfully");
  server.listen(SOCKET_PORT, ()=>console.log(`The socket server is running on a port ${SOCKET_PORT}...`));
  app.listen(SERVER_PORT,()=>console.log(`The server is running on a port ${SERVER_PORT}...`));
  node_media_server.run();
  //thumbnail_generator.start()
}).catch((err)=>console.log("Database connection error (" + err + ")"));