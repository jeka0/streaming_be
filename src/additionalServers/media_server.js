const { getUserByLogin } = require('../services/userService');
const { generateStreamThumbnail, delay } =require('../helpers/thumbnail');
const { formatToFile } = require('../helpers/dateFormat') 
const streamSevice = require('../services/streamService');
const userService = require('../services/userService');
const settingsService = require('../services/streamSettingsService')
const NodeMediaServer = require('node-media-server'),
    config = require('../../config/default').rtmp_server;
const { sendEndAlert, sendStartAlert, sendViewers } = require('./socketServer');
 
nms = new NodeMediaServer(config);
 
nms.on('prePublish', async (id, StreamPath, args) => {
    let user_name = getStreamNameFromStreamPath(StreamPath);
    const user = await getUserByLogin(user_name);
    const session = nms.getSession(id);
    if (!user  || !args.secret || user.streamKey !== args.secret) {
        session.reject();
    } else {
        streamSevice.finishStream(user.id);
        const settings = await settingsService.getSettingsByUserId(user.id);
        const name = formatToFile(session.connectTime);
        delete settings.id;
        streamSevice.createStream( user.id, { ...settings, recording_file: `${name}.mp4`});
        user.status = true;
        console.log(await userService.update(user));
        delete user.password;
        sendStartAlert(user);
        console.log('[NodeEvent on prePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
        delay(10000).then(() => {
            let user_name = getStreamNameFromStreamPath(StreamPath);
            generateStreamThumbnail(user_name, name);
        });
    }
});

nms.on('preConnect', async (id, args) => {
    if(args.streamPath){
        let user_name = getStreamNameFromStreamPath(args.streamPath);
        const stream = await streamSevice.getLiveStreamByLogin(user_name);
        stream.viewer_count++;
        console.log(await streamSevice.update(stream));
        sendViewers(stream);
    }
    console.log('[NodeEvent on preConnect]', `id=${id} args=${JSON.stringify(args)}`);
});

nms.on('doneConnect', async (id, args) => {
    if(args.streamPath){
        let stream_name = getStreamNameFromStreamPath(args.streamPath);
        const stream = await streamSevice.getLiveStreamByLogin(stream_name);
        stream.viewer_count--;
        console.log(await streamSevice.update(stream));
        sendViewers(stream);
    }
  console.log('[NodeEvent on doneConnect]', `id=${id} args=${JSON.stringify(args)}`);
});

nms.on('donePublish', async (id, StreamPath, args) => {
    let stream_name = getStreamNameFromStreamPath(StreamPath);
    const user = await getUserByLogin(stream_name);
    streamSevice.finishStream(user.id);
    user.status = false;
    console.log(await userService.update(user));
    delete user.password;
    sendEndAlert(user);
    console.log('[NodeEvent on donePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
});
 
const getStreamNameFromStreamPath = (path) => {
    let parts = path.split('/');
    return parts[parts.length - 1];
};
 
module.exports = nms;