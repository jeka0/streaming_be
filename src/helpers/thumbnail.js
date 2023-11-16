const spawn = require('child_process').spawn,
    config = require('../../config/default'),
    cmd = config.rtmp_server.trans.ffmpeg;

const delay = async (ms) => await new Promise(resolve => setTimeout(resolve, ms));

const generateStreamThumbnail = (stream_key) => {
    const args = [
        '-y',
        '-i', `http://127.0.0.1:8888/live/${stream_key}/index.m3u8`,
        '-ss', '1',
        '-t', '1',
        '-f', 'mjpeg',
        `./server/thumbnails/${stream_key}.png`,
    ];
    console.log(stream_key)
    const child = spawn(cmd, args);

    child.on('start', () => {
        console.log('Дочерний процесс запущен');
      });
      
      child.on('exit', (code) => {
        if (code === 0) {
          console.log('Дочерний процесс завершился успешно');
        } else {
          console.log('Дочерний процесс завершился с ошибкой');
        }
      });
      
      child.on('error', (err) => {
        console.error('Ошибка дочернего процесса:', err);
      });

      child.on('close', (code) => {
        console.log(
            `детский процесс завершился с кодом ${code}`
        );
    });
};

module.exports = {
    generateStreamThumbnail,
    delay
};