var firebaseConfig = {
    apiKey: "AIzaSyBLTTsM-qFQLFBJ07C6pgLMjp8G0B8erww",
    authDomain: "foodconnect-ef3d5.firebaseapp.com",
    projectId: "foodconnect-ef3d5",
    storageBucket: "foodconnect-ef3d5.appspot.com",
    messagingSenderId: "825236661161",
    appId: "1:825236661161:web:1d18e60e1d3b7771765ab8",
    measurementId: "G-1WHP9NHL5M"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()
const database = firebase.database()

function createAccount() {
    console.log('Create account button clicked')
    var email = document.getElementById('email_field').value;
    var password = document.getElementById('password_field').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // Account created
        var user = userCredential.user;
        // ... (Handle the new user, e.g., update UI)
        console.log('Succesfully registered user with email ' + user.email)
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log('Couldnt make account ' + errorMessage)
    });
}

// function login() {
//     var email = document.getElementById('email_field').value;
//     var password = document.getElementById('password_field').value;

//     firebase.auth().signInWithEmailAndPassword(email, password)
//     .then((userCredential) => {
//     // Signed in 
//     var user = userCredential.user;
//     // ... (Handle the signed in user, e.g., update UI)
//     })
//     .catch((error) => {
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     // ... (Handle errors)
//     });
// }
