var libObjects = require('../custom_modules/libraryObjects');
var mySqlClient = libObjects.mySqlClient;


function addUserPreference(client, uname, topic) {
    var inserted = false;
    client.query('INSERT INTO user_preferences SET ?', {username: uname, topic: topic},
        function(err, res) {
            if(err) {
                if(err.code != 'ER_DUP_ENTRY') {
                    throw err;
                } else {
                    inserted = false;
                }
            } else {
                inserted = true;
                console.log('Last insert ID:', res.insertId);
            }
        });
    return inserted;
}

exports.registerTopic = function(req, res, next) {
    var username = req.query.username;
    var topics = req.query.topics;
    var inserted = false;
    var redundantTopics = [];
    var returnText = '';
    if(typeof topics == 'string') {
        inserted = addUserPreference(mySqlClient, username, topics);
        if(!inserted) {
            redundantTopics.push(topics);
        }
    } else if(Array.isArray(topics)) {
        topics.forEach(function(topic) {
            inserted = addUserPreference(mySqlClient, username, topic);
            if(!inserted) {
                redundantTopics.push(topic);
            }
        });
    }
    if(redundantTopics.length == 0) {
        returnText = username + ' registered';
    } else {
        returnText = 'The following topic(s) already exist:<br>';
        redundantTopics.forEach(function(t) {
            returnText += '* ' + t + '<br>'
        });
    }
    res.send(returnText);
};

