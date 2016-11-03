var _ = require('lodash');
var bodyParser = require('body-parser');
var esClient = require('./esclient');
var express = require('express');
var http = require('http');
var nodemailer = require('nodemailer');
var path = require('path');
var validator = require('validator');
var winston = require('winston');

var app = express();

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

/**
 * API for creating a new tutor
 */
app.post('/api/tutor/create', (req, res) => {
  if(!req.body || !req.body.secret || req.body.secret != "datui") {
    res.send('No no..');
    return;
  }

  var tutorData = req.body;
  delete tutorData.secret;

  console.log(tutorData);

  esClient.create({
    index: 'datui',
    type: 'tutors',
    body: tutorData
  }, function (error, response) {
    console.log(error);
    console.log(response);
    res.send(response);
  });
});

/**
 * API for deleting an existing tutor
 */
app.post('/api/tutor/delete', (req, res) => {
  if(!req.body || !req.body.secret || req.body.secret != "datui") {
    res.send('No no..');
    return;
  }
  
  var id = req.body.id;
  console.log(id);
  esClient.delete({
    index: 'datui',
    type: 'tutors',
    id: id
  }, function (error, response) {
    console.log(error);
    console.log(response);
    res.send(response);
  });
});



app.get('/api/tutors', (req, res) => {
  esClient.search({
    index: 'datui',
    type: 'tutors',
    size: 20
  }, function (error, response) {
    if (!error) {
      var tutors = [];
      var tutorData = response.hits.hits;
      console.log(tutorData);

      tutorData.map((tutor) => {
        var stub = {
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
  var id = req.params.id;
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
      var subjects = getUniqSubjects(response['hits']['hits'].map(hit => hit.fields.courses));
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
  var validResult = validateContactMessage(req);
  if (validResult.isValid) {
    sendEmail(req.body);
  }
  res.send(JSON.stringify({success: validResult.isValid, errors: validResult.error}));
});

app.use('/', express.static(path.join(__dirname, 'public')));

var server = http.createServer(app);

server.listen(app.get('port'), function() {
  console.log('Magic happens on port 8081');
});

// esResponse is an array contain all the subarrays from each tutor
function getUniqSubjects(esResponse) {
  var allCourses = _.reduce(esResponse, (prev, courses) => prev.concat(getCourseArray(courses)), []);
  var uniqCourses = _.uniq(allCourses);
  return uniqCourses;
}

// @params => ['Math 101', 'STAT 151']
// return  => ['Math', 'STAT']
function getCourseArray(courses) {
  return courses.map(course => course.split(' ')[0]);
}

function validateContactMessage(request) {
  var error = {};
  var isValid = true;
  if (request.body) {
    if (!request.body.email || !validator.isEmail(request.body.email)) {
      var email = request.body.email;
      error["email"] = "Email is not valid";
      isValid = false;
    }

    if (!request.body.message || request.body.message.length <= 0) {
      var message = request.body.message;
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
      to: 'hello@datuiweb.com', // list of receivers
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

      logger.info('Email Sent:' + info.response);
      console.log('Message sent: ' + info.response);
  });
}
