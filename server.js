const http = require('http');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.locals.poll = [];

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public/authO/sign-in.html');
});

const port= process.env.PORT || 3000;

const server = http.createServer(app)
                   .listen(port, () => {
                      console.log(`Listening on port ${port}.`);
                    });

app.get('/api/poll', (req, res) => {
  res.json(app.locals.poll);
});

app.post('/api/poll', (req, res) => {
  // res.setHeader('Content-Type', 'application/json');
  console.log(req.body)

  const { question, response1, response2, response3 } = req.body

  if(!question) {
    return res.status(402).send({
      error: 'No post provided'
    });
  }

  app.locals.poll.push({ question: question, response_1: response1, response_2: response2, response_3: response3 })

  res.status(202).json({
    question: question,
    response_1: response1,
    response_2: response2,
    response_3: response3
  });
});

module.exports = server;
