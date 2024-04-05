const { Server } = require('socket.io');

module.exports = (server) => {
    const io = new Server(server, {
        path: '/api/video2',
        cors: { origin: '*', methods: ['GET', 'POST'] },
    });

    // 어떤 방에 어떤 유저가 들어있는지
    let users = {};
    // socket.id기준으로 어떤 방에 들어있는지
    let socketRoom = {};

    // 방의 최대 인원수
    const MAXIMUM = 2;

    io.on('connection', (socket) => {
        console.log('New client connected');

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });

        socket.on('screenShareOffer', (offer) => {
            socket.broadcast.emit('screenShareOffer', offer);
        });

        socket.on('screenShareAnswer', (answer) => {
            socket.broadcast.emit('screenShareAnswer', answer);
        });

        socket.on('screenShareCandidate', (candidate) => {
            socket.broadcast.emit('screenShareCandidate', candidate);
        });

        socket.on('videoOffer', (offer) => {
            socket.broadcast.emit('videoOffer', offer);
        });

        socket.on('videoAnswer', (answer) => {
            socket.broadcast.emit('videoAnswer', answer);
        });

        socket.on('videoCandidate', (candidate) => {
            socket.broadcast.emit('videoCandidate', candidate);
        });
    });
};
