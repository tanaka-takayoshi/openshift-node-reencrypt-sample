var https = require('https');
var http = require('http');
var fs = require('fs'); 
var express = require('express');
var app = express();
var path = require('path');
    
var port = process.env.PORT || process.env.OPENSHIFT_NODE_REENCRUPT_SERVICE_PORT || 8080;
var ip   = process.env.IP   || process.env.OPENSHIFT_NODE_REENCRUPT_SERVICE_HOST || '0.0.0.0';

console.log(process.env);

app.get('/', function (req, res) {
  res.send('Hello World!');
});

var secureServer = https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'ssl/server.key')),
    cert: fs.readFileSync(path.join(__dirname, 'ssl/server.crt')),
    ca: fs.readFileSync(path.join(__dirname, 'ssl/ca.crt')),
    requestCert: true,
    rejectUnauthorized: false
  }, app).listen(port, ip, function() {
    console.log('Server running on ' + ip + ':' + port);
});

//var server = http.createServer(app)
//                 .listen(port, ip, function() {
//    console.log('Server running on ' + ip + ':' + port);
//});
