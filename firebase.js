var firebase = require("firebase/app");
var firebaseConfig = require("./firebaseConfig");

firebase.initializeApp(firebaseConfig);

module.exports = firebase;