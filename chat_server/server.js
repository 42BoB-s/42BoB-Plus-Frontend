const express = require('express');
const socketIo = require('socket.io');
const http = require('http');

const app = express();
app.set('port', process.env.PORT || 5000);

app.use(require('./routes/index'));

const server = http.createServer(app);
const io = socketIo(server);

const socketList = [];

io.on('connection', function (socket) {
  socketList.push(socket);
  console.log('User Join');

  socket.on('SEND_MESSAGE', function (msg) {
    socketList.forEach(function (item) {
      console.log(item.id);
      if (item !== socket) {
        item.emit('RECEIVE_MESSAGE', msg);
      }
    });
  });

  socket.on('disconnect', function () {
    socketList.splice(socketList.indexOf(socket), 1);
    console.log('User Out');
  });
});

server.listen(5000, function () {
  console.log('Server On !');
});
