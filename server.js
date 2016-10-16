const express = require('express');
const http = require('http');
const path = require('path');
const app = express();

app.set('port', process.env.PORT || 8082);


app.use('/', express.static(path.join(__dirname, 'public')));

const server = http.createServer(app);

server.listen(app.get('port'), function() {
  console.log('Magic happens on port 8082');
});
