const _ = require('lodash');
const bodyParser = require('body-parser');
const esClient = require('./esclient');
const express = require('express');
const http = require('http');
const nodemailer = require('nodemailer');
const path = require('path');
const validator = require('validator');
const winston = require('winston');

const app = express();

var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({ filename: 'log.txt' })
  ]
});

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
  const validResult = validateContactMessage(req);
  if (validResult.isValid) {
    sendEmail(req.body);
  }
  res.send(JSON.stringify({success: validResult.isValid, errors: validResult.error}));
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
  var isValid = true;
  if (request.body) {
    if (!request.body.email || !validator.isEmail(request.body.email)) {
      const email = request.body.email;
      error["email"] = "Email is not valid";
      isValid = false;
    }

    if (!request.body.message || request.body.message.length <= 0) {
      const message = request.body.message;
      error["message"] = "Message is not valid";
      isValid = false;
    }
  } else {
    isValid = false;
    error["body"] = "Body not defined. Are you using the form??";
  }
  // return [isValid, error];
  return {
    isValid: isValid,
    error: error
  };
}

function sendEmail(body) {
  var transporter = nodemailer.createTransport('smtps://lyuu09%40gmail.com:LuciYu@1990@smtp.gmail.com');

  // setup e-mail data with unicode symbols
  var mailOptions = {
      from: '"Da Tui" <lyuu09@gmail.com>', // sender address
      to: 'leyuan@mailinator.com', // list of receivers
      subject: 'Hello ✔', // Subject line
      text: JSON.stringify(body, null, 4) // plaintext body
      // html: `<p></p>`
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
        logger.info(error);
        return console.log(error);
      }
      console.log('Message sent: ' + info.response);
  });
}
