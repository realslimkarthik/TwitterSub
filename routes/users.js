var MySqlDb = require('mysql');
var libObjects = require('../custom_modules/libraryObjects');
var mySqlClient = libObjects.mySqlClient;


exports.getUsers = function(req, res) {
    res.send('yes');
}

exports.registerUser = function(req, res) {
    var username = req.query.username;
    var inserted = false;
    var returnText = username;
    mySqlClient.query('INSERT INTO users SET ?', {username: username}, function(err, res) {
        if(err) {
            if(err.code != 'ER_DUP_ENTRY') {
                throw err;
            }
        } else {
            inserted = true;
            console.log('Last insert ID:', res.insertId);
        }
    });
    if(inserted) {
        returnText = username + ' registered';
    } else {
        returnText = username + ' already exists';
    }
    res.send(returnText);
}
