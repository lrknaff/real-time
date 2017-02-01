const http = require('http');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const md5 = require('md5');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.locals.poll = {};

app.use('/poll', express.static(path.join(__dirname, 'public')));

app.use('/', express.static(path.join(__dirname, 'public/authO')));

const port= process.env.PORT || 3000;

const server = http.createServer(app)
                   .listen(port, () => {
                      console.log(`Listening on port ${port}.`);
                    });

app.get('/api/poll', (req, res) => {
  res.json(app.locals.poll);
});

app.post('/api/poll', (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const { question, response1, response2, response3 } = req.body
  const id = md5(question)

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

  socket.on('disconnect', () => {
    console.log('A user has disconnected.', io.engine.clientsCount);
    io.sockets.emit('usersConnected', io.engine.clientsCount);
  });
});


module.exports = server;
