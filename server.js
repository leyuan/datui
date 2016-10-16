const express = require('express');
const http = require('http');
const path = require('path');
const app = express();

const esClient = require('./esclient');

app.set('port', process.env.PORT || 8081);

app.get('/api/tutors', function (req, res) {
  esClient.search({
    index: 'datui',
    type: 'tutors',
    size: 2
  }, function (error, response) {
    if (!error) {
      const tutors = [];
      const tutorData = response.hits.hits;
      console.log(tutorData);

      tutorData.map((tutor) => {
        const stub = {
          id: tutor['_id'],
          source: tutor['_source'] //TODO - may need to simplify the data in future
        };

        tutors.push(stub);
      });

      res.send(tutors);
    } else {
      console.log(error);
      res.send([]);
    }
  });
});

app.use('/', express.static(path.join(__dirname, 'public')));

const server = http.createServer(app);

server.listen(app.get('port'), function() {
  console.log('Magic happens on port 8081');
});
