var config = require('config');
var Twitter = require('twitter');
var twitterClient = new Twitter(config.twitter_credentials);

define(function (require) {
    var singleton = function() {
        return {

        };
    };
    return singleton();
})

var streamer = undefined;
function start_streaming(streamer, track_string) {
    if(track_string) {
        streamer = twitterClient.stream('statuses/filter', {track: trackString}, function(stream) {
            stream.on('data', function(tweet) {
                console.log(tweet);
            });
        });
    }
    return streamer;
}


var MySqlDb = require('mysql');
var mySqlClient = new MySqlDb.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'password',
    database: 'TwitterSub'
});

mySqlClient.connect(function(err) {
    if(err) {
        console.error(err.stack);
        return;
    }
    console.log('Connected as id ' + mySqlClient.threadId);
});


function getTopics() {
    var trackString = '';
    mySqlClient.query('SELECT DISTINCT topic FROM user_preferences;', function(err, rows, fields) {
        if(err) throw err;

        rows.forEach(function(r) {
            trackString.concat(r.topic + ', ');
        });
    });
    return trackString;
}


exports.twitterClient = twitterClient;
exports.mySqlClient = mySqlClient;
exports.getTopics = getTopics;
exports.start_streaming = start_streaming;
exports.streamer = streamer;
