var Twitter = require('twitter');
var twitterClient = new Twitter({
    consumer_key: 'Koa0XC6s5Lb5oNgJFnMVqi8ch',
    consumer_secret: 'Va2eWsve8tLMJjO3REkydZmWBuSxa2qtoiSuK2C9XEzNUSsJEn',
    access_token_key: '478809538-uTAWlWI3j6hbSs0bb8PZ3OrGCBel9QM8oD570lhH',
    access_token_secret: 'f4HIIYiP9eR6uyZg43oLZwoEcrYGmcUnZttDkdIEAn95U'
});


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

var trackString = '';
mySqlClient.query('SELECT DISTINCT * FROM user_preferences;', function(err, rows, fields) {
    if(err) throw err;

    rows.forEach(function(r) {
        trackString += r.topic + ',';
    });
});
console.log(trackString + 'is trackstring');
exports.twitterClient = twitterClient;
exports.mySqlClient = mySqlClient;
exports.trackString = trackString;
