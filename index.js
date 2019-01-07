const appName = 'socket-io-server';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const myDebbuger = require('debug')(appName);
const socketIO = require('socket.io');


// midlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//routes
app.get('/', (req, res) => {
  res.send('hello world');
})

//server listen
const server = app.listen(5050, () => {
  myDebbuger('server is running on port: ', server.address().port);
});


// connect of socket
const io = socketIO(server);

io.on('connection', (socket) => {
  myDebbuger('new connection: ', socket.id);
  
  socket.on('change color', (color) => {
   // once we get a 'change color' event from one of our clients, we will send it to the rest of the clients
   // we make use of the socket.emit method again with the argument given to use from the callback function above
   myDebbuger('Color Changed to: ', color)
   io.sockets.emit('change color', color)
 })

 // disconnect is fired when a client leaves the server
 socket.on('disconnect', () => {
   myDebbuger('user disconnected')
 })
})
