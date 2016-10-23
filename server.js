const express = require('express');
const http = require('http');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const _ = require('lodash');

const esClient = require('./esclient');

app.set('port', process.env.PORT || 8081);
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

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

app.get('/api/courses', (req, res) => {
  esClient.search({
    index: 'datui',
    type: 'tutors',
    fields: 'courses'
  }, function(error, response) {
    if (!error) {
      const courses = getUniqCourses(response['hits']['hits'].map(hit => hit.fields.courses));
      res.send(JSON.stringify({courses: courses}));
    } else {
      console.log(error);
      res.send(null);
    }
  });
});

app.post('/api/students', (req, res) => {
  if (req.body && req.body.email) {
    esClient.create({
      index: 'datui',
      type: 'students',
      body: {
        email: req.body.email
      },
    }, function (error, response) {
      if (!error) {
        res.send(JSON.stringify({status: 200}));
      }
    });
  } else {
    console.log('email is not present');
  }
});

app.use('/', express.static(path.join(__dirname, 'public')));

const server = http.createServer(app);

server.listen(app.get('port'), function() {
  console.log('Magic happens on port 8081');
});

// esResponse is an array contain all the subarrays from each tutor
function getUniqCourses(esResponse) {
  const allCourses = _.reduce(esResponse, (prev, courses) => prev.concat(getCourseArray(courses)), []);
  const uniqCourses = _.uniq(allCourses);
  return uniqCourses;
}

// @params => ['Math 101', 'STAT 151']
// return  => ['Math', 'STAT']
function getCourseArray(courses) {
  return courses.map(course => course.split(' ')[0]);
}
