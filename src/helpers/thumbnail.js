const spawn = require('child_process').spawn,
    config = require('../../config/default'),
    cmd = config.rtmp_server.trans.ffmpeg;
const { copyImage} = require('./fs')

const delay = async (ms) => await new Promise(resolve => setTimeout(resolve, ms));

const generateStreamThumbnail = (user_name, name) => {
    const args = [
        '-y',
        '-i', `http://127.0.0.1:8888/live/${user_name}/index.m3u8`,
        '-ss', '1',
        '-t', '1',
        '-f', 'mjpeg',
        `./server/thumbnails/${user_name}.png`,
    ];
    const child = spawn(cmd, args);

    child.on('start', () => {
        console.log('Дочерний процесс запущен');
      });
      
      child.on('exit', (code) => {
        if (code === 0) {
          console.log('Дочерний процесс завершился успешно');
          if(name)copyImage(`${user_name}.png`, `${name}.png`)
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