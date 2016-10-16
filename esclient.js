var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: 'https://lucius:9eyu20@9bd7ea44d11fea4966319b0e58ba0ad2.us-west-2.aws.found.io:9243',
  log: 'trace',
});

// client.ping({
//   hello: "elasticsearch!"
// }, function (error) {
//   if (error) {
//     console.trace('elasticsearch cluster is down!');
//   } else {
//     console.log('All is well');
//   }
// });

module.exports = client;
