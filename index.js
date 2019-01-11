const appName = 'socket-io-server';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const myDebbuger = require('debug')(appName);
const socketIO = require('socket.io');

const route = require('./routes/route');

//server listen
const server = app.listen(5050, () => {
  myDebbuger('server is running on port: ', server.address().port);
});

// midlewares
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// route
app.use('/', route);

// connect of socket
const io = socketIO(server, {
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false
});

io.on('connection', (socket) => {
  myDebbuger('new connection: ', socket.id);
  app.set('socketio', socket);
})
