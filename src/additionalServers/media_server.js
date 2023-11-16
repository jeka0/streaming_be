const { getUserByStreamKey } = require('../services/userService');
const { generateStreamThumbnail, delay } =require('../helpers/thumbnail');
const streamSevice = require('../services/streamService');
const NodeMediaServer = require('node-media-server'),
    config = require('../../config/default').rtmp_server;
 
nms = new NodeMediaServer(config);
 
nms.on('prePublish', async (id, StreamPath, args) => {
    let stream_key = getStreamKeyFromStreamPath(StreamPath);
    const user = await getUserByStreamKey(stream_key);
    if (!user) {
        let session = nms.getSession(id);
        session.reject();
    } else {
        streamSevice.createStream( user.id, { stream_title:"AAAAAAAAAA", category: "games" });
        console.log('[NodeEvent on prePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
        delay(10000).then(() => {
            let stream_key = getStreamKeyFromStreamPath(StreamPath);
            generateStreamThumbnail(stream_key);
        });
    }
});

nms.on('donePublish', async (id, StreamPath, args) => {
    let stream_key = getStreamKeyFromStreamPath(StreamPath);
    const user = await getUserByStreamKey(stream_key);
    streamSevice.finishStream(user.id);
});
 
const getStreamKeyFromStreamPath = (path) => {
    let parts = path.split('/');
    return parts[parts.length - 1];
};
 
module.exports = nms;