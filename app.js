require('dotenv').config();
require('./src/config/dbConn')
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const http = require('http');

const baseRouter = require('./src/routes/router');
const testRoute = require('./src/routes/test');


const port = process.env.PORT || 8000;
const app = express();
const server = http.createServer(app);

// socket connection
const io = require('socket.io')(server, {
    // pingTimeout: 60000,
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});


app.use(cors({
    credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', baseRouter);
app.use('/test', testRoute);

app.get('/api', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'amar.html'))
});

// socket io
let users = []

const addUser = (userId, socketId) => {
    !users.some((user) => user.id === userId) &&
        users.push({userId: userId, socketId })
}

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId)
}

const getUser = (userId) => {
    return users.find(user => user.userId = userId)
}



io.on('connection', (socket) => {
    console.log(`user connected with the socket id ${socket.id}`);

    socket.on('addUsers', (userId) => {
        addUser(userId, socket.id)
    });
    io.emit('getUsers', users);

    // get and send message

    socket.on('sendMessage', ({ sender, receiverId, content }) => {
        const user = getUser(receiverId);
        // console.log(user);
        io.to(user.socketId).emit('getMessage', {
            // io.emit('getMessage',{
            sender: { _id: sender },
            content
        });
    });

    // disconnections
    socket.on('disconnet', () => {
        console.log('user disconnected');
        removeUser(socket.id);
        io.emit('getUsers', users)
    })

})

server.listen(port, () => {
    console.log(`server is running at port no. ${port}`);
});