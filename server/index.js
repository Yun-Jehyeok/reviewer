const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/index');
const hpp = require('hpp');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();

app.use(hpp());
app.use(helmet());

app.use(
    cors({
        origin: true,
        credentials: true,
    }),
);

app.use(morgan('dev'));
app.use(express.json());

const { MONGO_URI, PORT } = config;

let mongo_url = '';
let port = '';

if (process.env.NODE_ENV === 'production') {
    mongo_url = process.env.MONGO_URI;
    port = process.env.PORT;
} else {
    port = PORT;
    mongo_url = MONGO_URI;
}

mongoose
    .set('strictQuery', true)
    .connect(mongo_url)
    .then(() => {
        console.log('mongodb connecting success');
    })
    .catch((err) => {
        console.log(err);
    });

app.use('/api/user', require('./routes/api/user'));
app.use('/api/post', require('./routes/api/post'));
app.use('/api/application', require('./routes/api/application'));
app.use('/api/alarm', require('./routes/api/alarm'));
app.use('/api/review', require('./routes/api/review'));
app.use('/api/payment', require('./routes/api/payment'));

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        credentials: true,
    },
});

const chatWebSocket = require('./middleware/socket');
const videoWebSocket = require('./middleware/video');
chatWebSocket(io);
chatWebSocket.ioModule = io;

httpServer.listen(port, () => {
    console.log(`Server started on ${PORT} port`);
});
