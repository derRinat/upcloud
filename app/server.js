/** Simple server, serve app */

var express    = require('express'),
    http       = require('http'),
    app        = express(),
    httpServer = http.Server(app),
    port       = 3000;

app.use(express.static(__dirname +'/'));

app.get('/', function(req, res){
    res.sendfile(__dirname + '/index.html');
});

app.listen(port, function() {
    console.log('Server started on port: ', port);
});