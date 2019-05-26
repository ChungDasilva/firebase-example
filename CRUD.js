var firebase = require('./firebase');
require("firebase/database");

var database = firebase.database();

function writeUserData(id, name, email, imageUrl) {
    database.ref('user/' + id).set({
      username: name,
      email: email,
      profile_picture : imageUrl
    });
}

module.exports = {
    writeUserData
}