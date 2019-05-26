var login = require('./login-firebase');
var {writeUserData} = require('./CRUD');
var admin = require('./admin');

async function signUp(email, password, phoneNumber, displayName, photoURL) {
    var user = await admin.auth().createUser({
        email,
        emailVerified : false,
        phoneNumber,
        password,
        displayName,
        photoURL,
        disabled :false
    })
    .then(async function(userRecord) {
        await login(email, password)
    })
    .catch(async function(error) {
        console.error(error.code);
    });
}

function signIn(email, password) {
   return login(email, password);
}

module.exports = {
    signIn,
    signUp
}
