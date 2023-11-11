const spawn = require('child_process').spawn,
    config = require('../../config/default'),
    cmd = config.rtmp_server.trans.ffmpeg;
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');

const generateStreamThumbnail = (stream_key) => {



};

module.exports = {
    generateStreamThumbnail
};