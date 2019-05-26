var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccount/fir-example-a1179-firebase-adminsdk-ytdmb-441777e9d2.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fir-example-a1179.firebaseio.com"
});

module.exports = admin;