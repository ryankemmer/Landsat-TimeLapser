var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var indexRouter = require('./router.js');

var https = require('https');
var http = require('http');
var fs = require('fs');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', indexRouter);

app.use((req, res) => {
  res.status(404).send('file not found');
});


app.all('*', function (req, res, next) {

  // Set CORS headers: allow all origins, methods, and headers: you may want to lock this down in a production environment
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
  res.header("Access-Control-Allow-Headers", req.header('access-control-request-headers'));

  if (req.method === 'OPTIONS') {
      // CORS Preflight
      res.send();
  } else {
      var targetURL = req.header('Target-URL'); // Target-URL ie. https://example.com or http://example.com
      if (!targetURL) {
          res.send(500, { error: 'There is no Target-Endpoint header in the request' });
          return;
      }
      request({ url: targetURL + req.url, method: req.method, json: req.body, headers: {'Authorization': req.header('Authorization')} },
          function (error, response, body) {
              if (error) {
                  console.error('error: ' + response.statusCode)
              }
//                console.log(body);
          }).pipe(res);
  }
});

var httpServer = http.createServer(app);

httpServer.listen(8080);


console.log('listening on port 8080');
