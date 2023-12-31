const { getUserByStreamKey } = require('../services/userService');
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
    let stream_key = getStreamKeyFromStreamPath(StreamPath);
    const user = await getUserByStreamKey(stream_key);
    if (!user) {
        let session = nms.getSession(id);
        session.reject();
    } else {
        const settings = await settingsService.getSettingsByUserId(user.id);
        const name = formatToFile(new Date());
        delete settings.id;
        streamSevice.createStream( user.id, { ...settings, recording_file: `${name}.mp4`});
        userService.updateCurrentUser(user.id, { status: true});
        user.status = true;
        delete user.password;
        sendStartAlert(user);
        console.log('[NodeEvent on prePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
        delay(10000).then(() => {
            let stream_key = getStreamKeyFromStreamPath(StreamPath);
            generateStreamThumbnail(stream_key, name);
        });
    }
});

nms.on('preConnect', async (id, args) => {
    if(args.streamPath){
        let stream_key = getStreamKeyFromStreamPath(args.streamPath);
        const stream = await streamSevice.getLiveStreamByKey(stream_key);
        stream.viewer_count++;
        streamSevice.updateStream(stream.id, stream.user.id, stream);
        sendViewers(stream);
    }
    console.log('[NodeEvent on preConnect]', `id=${id} args=${JSON.stringify(args)}`);
});

nms.on('doneConnect', async (id, args) => {
    if(args.streamPath){
        let stream_key = getStreamKeyFromStreamPath(args.streamPath);
        const stream = await streamSevice.getLiveStreamByKey(stream_key);
        stream.viewer_count--;
        streamSevice.updateStream(stream.id, stream.user.id, stream);
        sendViewers(stream);
    }
  console.log('[NodeEvent on doneConnect]', `id=${id} args=${JSON.stringify(args)}`);
});

nms.on('donePublish', async (id, StreamPath, args) => {
    let stream_key = getStreamKeyFromStreamPath(StreamPath);
    const user = await getUserByStreamKey(stream_key);
    streamSevice.finishStream(user.id);
    userService.updateCurrentUser(user.id, { status: false});
    user.status = false;
    delete user.password;
    sendEndAlert(user);
});
 
const getStreamKeyFromStreamPath = (path) => {
    let parts = path.split('/');
    return parts[parts.length - 1];
};
 
module.exports = nms;