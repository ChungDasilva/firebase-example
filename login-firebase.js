require('firebase/firebase-auth');
var firebase = require('./firebase');

function login (email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
        console.log('login success');
    })
    .catch(function(error) {
        console.log(error);
    });
}

module.exports = login;