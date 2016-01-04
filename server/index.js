var express = require('express');
var fcExp = require('falcor-express');
var bodyParser = require('body-parser');
var model = require('./models/test');
var path = require('path');

var app = express();

var _root = path.join(__dirname, '..');

// Statics
app.use(express.static(path.join(_root, 'app')));
app.use('/lib', express.static(path.join(_root, 'node_modules')));

// Midware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Routers
app.get('/', function (req, res) {
  res.sendFile(path.join(_root, 'app', 'index.html'));
});

app.use('/model', fcExp.dataSourceRoute(function (req, res) {
  return model.asDataSource();
}));

app.post('/auth', function (req, res) {

  model.setValue('token', '12312312').then(function (res) {
    console.log('set token = %s', res);
  });

  res.end();
});

// Start server
var server = app.listen(3000, 'localhost', function () {
  var addr = server.address();
  console.log('Server start at http://%s:%s -- %s',
    addr.address, addr.port, new Date());
});
