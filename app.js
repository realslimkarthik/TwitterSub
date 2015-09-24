var express = require('express');
var Twitter = require('twitter');
// var mariaDb  = require('mariasql');
var mysqlDb = require('mysql');


// var mariaClient = new mariaDb({
var mySqlClient = new mysqlDb.createConnection({
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


var twitterClient = new Twitter({
    consumer_key: 'Koa0XC6s5Lb5oNgJFnMVqi8ch',
    consumer_secret: 'Va2eWsve8tLMJjO3REkydZmWBuSxa2qtoiSuK2C9XEzNUSsJEn',
    access_token_key: '478809538-uTAWlWI3j6hbSs0bb8PZ3OrGCBel9QM8oD570lhH',
    access_token_secret: 'f4HIIYiP9eR6uyZg43oLZwoEcrYGmcUnZttDkdIEAn95U'
});

// twitterClient.stream('statuses/filter', {track: 'messi'}, function(stream) {
//     stream.on('data', function(tweet) {
//         console.log(tweet.text);
//     });

//     stream.on('error', function(error) {
//         throw error;
//     });

// });


// twitterClient.get('search/tweets', {q: 'messi'}, function(error, tweets, response) {
//     console.log(tweets);
// });

var app = express();

app.get('/', function(req, res) {
    res.send('Hello World!');
});

app.get('/register', function(req, res) {
    var username = req.query.username;
    var topics = req.query.topics;
    console.log(username);
    console.log(topics);
    mySqlClient.query('INSERT INTO users SET ?', {username: username}, function(err, res) {
        if(err) throw err;

        console.log('Last insert ID:', res.insertId);
    });
    if(typeof topics == 'string') {
        console.log(username + ' ' + topics);
        mySqlClient.query('INSERT INTO user_preferences SET ?', {username: username, topic: topics},
            function(err, res) {
                if(err) throw err;

                console.log('Last insert ID:', res.insertId);
            });
    } else if(Array.isArray(topics)) {
        topics.forEach(function(topic) {
            mySqlClient.query('INSERT INTO user_preferences SET ?', {username: username, topic: topic},
            function(err, res) {
                if(err) throw err;

                console.log('Last insert ID:', res.insertId);
            });
        });
    }
    res.send(username + 'registered');
});

app.get('/test', function(req, res) {
    tweets1 = {'tweets1':{}, 'tweets2':{}};
    tweets1['tweets1'] = twitterClient.get('search/tweets', {q: 'messi'}, function(error, tweets, response) {
        // tweets1['tweets1'] = tweets;
        console.log(tweets);
        return tweets;
    });
    tweets1['tweets2'] = twitterClient.get('search/tweets', {q: 'messi'}, function(error, tweets, response) {
        // tweets1['tweets2'] = tweets;
        console.log(tweets);
        return tweets;
    });
    res.send(tweets1);
});

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example');
});
