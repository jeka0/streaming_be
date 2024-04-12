const config = {
    server: {
        secret: 'kjVkuti2xAyF3JGCzSZTk0YWM5JhI9mgQW4rytXc'
    },
    rtmp_server: {
        rtmp: {
            port: 1935,
            chunk_size: 2000,
            gop_cache: true,
            ping: 60,
            ping_timeout: 30,
        },
        http: {
            port: 8888,
            mediaroot: './server/media',
            allow_origin: '*',
            
        },
        trans: {
            ffmpeg: '../ffmpeg/ffmpeg-2023-09-07-git-9c9f48e7f2-full_build/bin/ffmpeg.exe',
            tasks: [
                {
                    app: 'live',
                    hls: true,
                    hlsFlags: '[hls_time=1:hls_list_size=3:hls_flags=delete_segments]',
                    mp4: true,
                    mp4Flags: '[movflags=frag_keyframe+empty_moov]'
                }
            ]
        },
    }
    
};

module.exports = config;