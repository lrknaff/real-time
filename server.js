const http = require('http');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const md5 = require('md5');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const votes = {};
const users = [];
app.locals.poll = {};

app.use('/poll', express.static(path.join(__dirname, 'public')));

// app.use('/', express.static(path.join(__dirname, 'public')));

app.use('/login', express.static(path.join(__dirname, 'public/authO')));

app.use('/login/:id', express.static(path.join(__dirname, 'public/authO')));

const port= process.env.PORT || 3000;

const server = http.createServer(app)
                   .listen(port, () => {
                      console.log(`Listening on port ${port}.`);
                    });

app.get('/api/poll/:id', (req, res) => {
  res.json(app.locals.poll);
});

app.post('/api/poll/:id', (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const { id, question, response1, response2, response3 } = req.body

  if(!req.body) {
    return res.status(402).send({
      error: 'No post provided'
    });
  }

  app.locals.poll = { id: id, question: question, response_1: response1, response_2: response2, response_3: response3 }

  res.status(202).json({
    id: id,
    question: question,
    response_1: response1,
    response_2: response2,
    response_3: response3
  });
});

const socketIo = require('socket.io');
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('A user has connected.', io.engine.clientsCount);

  io.sockets.emit('usersConnected', io.engine.clientsCount);

  socket.on('message', (channel, message) => {
    if(channel === "voteCast") {
      votes[socket.id] = message;
      io.sockets.emit('voteCast', votes)
      console.log('votes', votes)
    }
    if(channel === "userInformation") {
      users.push({name: message.name, picture: message.picture})
      io.sockets.emit('userList', users)
      console.log('users', users)
    }
  });

  socket.on('disconnect', () => {
    console.log('A user has disconnected.', io.engine.clientsCount);
    io.sockets.emit('usersConnected', io.engine.clientsCount);
  });
});


module.exports = server;
