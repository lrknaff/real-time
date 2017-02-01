const http = require('http');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const md5 = require('md5');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.locals.poll = {};

app.use('/', express.static(path.join(__dirname, 'public')));

app.use('/login', express.static(path.join(__dirname, 'public/authO')));

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/public/authO/sign-in.html');
// });

// app.get('/login', (req, res) => {
//   res.sendFile(__dirname + '/public/authO/sign-in.html');
// });

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

module.exports = server;
