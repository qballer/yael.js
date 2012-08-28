var http = require('http'),
	flatiron = require('flatiron'),
	fs = require("fs"),
	director = require('director'),
	app = flatiron.app;

function showAdmin() {
  this.res.writeHead(200, { 'Content-Type': 'text/plain' })
  this.res.end('Admin');
};

function showIndex() {
  this.res.writeHead(200, { 'Content-Type': 'text/plain' })
  this.res.end('Index');
}

app.use(flatiron.plugins.http, {
    // HTTP options
  });

var routes = {
  '/': {get: showIndex},
  '/admin': {get: showAdmin}
};

var router = new director.http.Router(routes);

var server = http.createServer(function (req, res) {
  router.dispatch(req, res, function (err) {
    if (err) {
      res.writeHead(404);
      res.end();
    }
  });
});

server.listen(8080);