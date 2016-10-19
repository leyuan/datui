const express = require('express');
const http = require('http');
const path = require('path');
const app = express();
const reload = require('reload');

const esClient = require('./esclient');

app.set('port', process.env.PORT || 8081);

app.get('/api/tutors', (req, res) => {
  esClient.search({
    index: 'datui',
    type: 'tutors',
    size: 20
  }, function (error, response) {
    if (!error) {
      const tutors = [];
      const tutorData = response.hits.hits;
      // console.log(tutorData);

      tutorData.map((tutor) => {
        const stub = {
          id: tutor['_id'],
          source: tutor['_source'] //TODO - may need to simplify the data in future
        };

        tutors.push(stub);
      });

      res.send(JSON.stringify(tutors));
    } else {
      console.log(error);
      res.send([]);
    }
  });
});

app.get('/api/tutor/:id', (req, res) => {
  const id = req.params.id;
  esClient.get({
    index: 'datui',
    type: 'tutors',
    id: id
  }, function (error, response) {
    if (!error) {
      res.send(JSON.stringify(response['_source']));
    } else {
      console.log(error);
      res.send(null);
    }
  });
});

app.use('/', express.static(path.join(__dirname, 'public')));

const server = http.createServer(app);

reload(server, app);

server.listen(app.get('port'), function() {
  console.log('Magic happens on port 8081');
});
