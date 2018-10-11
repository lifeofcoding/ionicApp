var express = require('express');
var app = express();
var server = require('http').createServer(app);
// var io = require('socket.io')(server);

const Youtube = require('./sources/youtube');

app.get('*', function(req, res, next) {
    res.send({ running: true });
});

process.on('message', (data) => {
    console.log('message', data);

    Youtube.search(searchTerms).then((results) => {
        console.log('youtube results', results);
        process.send('message', {results: results});
    });
});

server.listen(4200);
