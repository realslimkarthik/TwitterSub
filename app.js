var express = require('express');
var routes = require('./routes');
var users = require('./routes/users');
var common = require('./routes/common');
var libObjects = require('./custom_modules/libraryObjects');
var twitterClient = libObjects.twitterClient;
var trackString = libObjects.trackString


var app = express();

app.get('/', routes.index);
app.get('/registerUser', users.registerUser);
app.get('/registerTopic', common.registerTopic);


console.log(trackString + ' main');
twitterClient.stream('statuses/filter', {track: trackString}, function(stream) {
    stream.on('data', function(tweet) {
        console.log(tweet);
    });

    stream.on('error', function(error) {
        throw error;
    });
})

// app.get('/test', function(req, res) {
//     tweets1 = {'tweets1':{}, 'tweets2':{}};
//     tweets1['tweets1'] = twitterClient.get('search/tweets', {q: 'messi'}, function(error, tweets, response) {
//         console.log(tweets);
//         return tweets;
//     });
//     tweets1['tweets2'] = twitterClient.get('search/tweets', {q: 'messi'}, function(error, tweets, response) {
//         console.log(tweets);
//         return tweets;
//     });
//     res.send(tweets1);
// });

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example');
});
