// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");
require("firebase/storage");
require("firebase/database");
var admin = require('firebase-admin');


// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyBiPA3qqLcZ6fGZcAcQqMUljUNTKDp60Ys",
    authDomain: "fir-example-a1179.firebaseapp.com",
    databaseURL: "https://fir-example-a1179.firebaseio.com",
    projectId: "fir-example-a1179",
    storageBucket: "fir-example-a1179.appspot.com",
    messagingSenderId: "243476191388",
    appId: "1:243476191388:web:e09eb6a5f6ebc156"
  };

// Initialize Firebase with a default Firebase project
firebase.initializeApp(firebaseConfig);

// Initialize Firebase with a second Firebase project
// var otherProject = firebase.initializeApp(otherProjectFirebaseConfig, "other");

console.log(firebase.app().name);  // "[DEFAULT]"
// console.log(otherProject.name);    // "otherProject"

// Use the shorthand notation to access the default project's Firebase services
var defaultStorage = firebase.storage();
var defaultFirestore = firebase.firestore();
var database = firebase.database();
// console.log(database);

// Use the otherProject variable to access the second project's Firebase services
// var otherStorage = otherProject.storage();
// var otherFirestore = otherProject.firestore();
function writeUserData(id, name, email, imageUrl) {
    database.ref('user/' + id).set({
      username: name,
      email: email,
      profile_picture : imageUrl
    });
}

function WritePostsData(postId) {
  database.ref('posts/' + postId + '/starCount').set({
    postId : postId,
    title : "Hello"
  })
}

var starCountRef = firebase.database().ref('posts/' + 2 + '/starCount');
starCountRef.on('value', function(snapshot) {
  console.log(snapshot.val());
  // updateStarCount(postElement, snapshot.val());
});



 writeUserData(1,"chung", "chung12dt@gmail.com", "a.jpg");
 WritePostsData(2);

// create Admin
var serviceAccount = require("./fir-example-a1179-firebase-adminsdk-ytdmb-bf57ef86ad.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fir-example-a1179.firebaseio.com"
});

 admin.auth().createUser({
  email: 'chung12dt@gmail.com',
  emailVerified: false,
  phoneNumber: '+84968347807',
  password: 'secretPassword',
  displayName: 'John Doe',
  photoURL: 'http://www.example.com/12345678/photo.png',
  disabled: false
})
  .then(function(userRecord) {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log('Successfully created new user:', userRecord.uid);
  })
  .catch(function(error) {
    console.log('Error creating new user:', error);
  });


var userId = firebase.auth().currentUser.uid;
console.log(userId);
return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
  var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
  // ...
});

email = "nguyen.ha.chung@captcha.com";
password = "13121993Ch";

firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  console.log(errorCode);
  console.log(errorMessage);
  // ...
});

email = "chung12dt@gmail.com";
password = "secretPassword";


function login (email, password) {
  return new Promise((resolve, reject) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((returnedUser) => {
      return resolve(returnedUser.user.uid);
    })
    .catch(function(error) {
      return reject(error);
      // // Handle Errors here.
      // var errorCode = error.code;
      // var errorMessage = error.message;
      // console.log(errorCode);
      // console.log(errorMessage);
      // // ...
    });
  })
  // console.log(firebase.auth().signInWithEmailAndPassword(email, password));
}
// var user = firebase.auth().currentUser;

// console.log(firebase.auth());

async function  run() {
  var uid = await login(email, password);
  console.log(uid);
  var user = firebase.auth().currentUser;

  if (user != null) {
      user.providerData.forEach(function (profile) {
        console.log("Sign-in provider: " + profile.providerId);
        console.log("  Provider-specific UID: " + profile.uid);
        console.log("  Name: " + profile.displayName);
        console.log("  Email: " + profile.email);
        console.log("  Photo URL: " + profile.photoURL);
      });
  } else {
    console.log('no user')
  }
  firebase.auth().signOut().then(function() {
    console.log("Sign-out successful")
  }).catch(function(error) {
    console.log("An error happened")
  });
}

run();



