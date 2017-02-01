const http = require('http');
const express = require('express');

const app = express();

app.use(express.static('public/authO'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/authO/sign-in.html');
});

const port= process.env.PORT || 3000;

const server = http.createServer(app)
                   .listen(port, () => {
                      console.log(`Listening on port ${port}.`);
                    });


module.exports = server;
