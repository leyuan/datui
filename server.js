const express = require('express');
const http = require('http');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const _ = require('lodash');
const validator = require('validator');

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

app.get('/api/subjects', (req, res) => {
  esClient.search({
    index: 'datui',
    type: 'tutors',
    fields: 'courses'
  }, function(error, response) {
    if (!error) {
      const subjects = getUniqSubjects(response['hits']['hits'].map(hit => hit.fields.courses));
      res.send(JSON.stringify({subjects: subjects}));
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

app.post('/api/contact-message', (req, res) => {
  [isValid, errors] = validateContactMessage(req);
  res.send(JSON.stringify({success: isValid, errors: errors}));
});

app.use('/', express.static(path.join(__dirname, 'public')));

const server = http.createServer(app);

server.listen(app.get('port'), function() {
  console.log('Magic happens on port 8081');
});

// esResponse is an array contain all the subarrays from each tutor
function getUniqSubjects(esResponse) {
  const allCourses = _.reduce(esResponse, (prev, courses) => prev.concat(getCourseArray(courses)), []);
  const uniqCourses = _.uniq(allCourses);
  return uniqCourses;
}

// @params => ['Math 101', 'STAT 151']
// return  => ['Math', 'STAT']
function getCourseArray(courses) {
  return courses.map(course => course.split(' ')[0]);
}

function validateContactMessage(request) {
  const error = {};
  let isValid = true;
  if (request.body && request.body.email && request.body.message) {
    const email = request.body.email;
    if (!validator.isEmail(email)) {
      error["email"] = "Email is not valid";
      isValid = false;
    }

    const message = request.body.message;
    if (message.length <= 0) {
      error["message"] = "Message is not valid";
      isValid = false;
    }
  } else {
    isValid = false;
    error["body"] = "Body not defined. Are you using the form??";
  }
  return [isValid, error];
}
