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

firebase.auth().onAuthStateChanged((user) => {
    const accountContainer = document.getElementById('account_info');

    if (user) {
        console.log('here is user id: ' + user.uid)
        fetchUserData(user.uid);
    } else {
        console.log('No User Signed In')
        document.getElementById('logoutButton').style.display = 'none'
        const contentContainer = document.getElementById('content');

    }
});


function fetchUserData(userID) {
    const dbRef = firebase.database().ref('foodBanks/' + userID);

    dbRef.once('value', (snapshot) => {
        if (snapshot.exists()) {
            const userData = snapshot.val();
            populateUserDetails(userData);
            document.getElementById('loginContainer').style.display = 'none';
        } else {
            console.log("User not found");
            accountContainer.innerHTML = `
            <p>Please sign in or register a Food Bank</p>`;    
        }
    }).catch((error) => {
        console.error("Error fetching user data:", error);

    });
}

function populateUserDetails(userData) {
    const userDetailsContainer = document.querySelector('.user-details');
    userDetailsContainer.innerHTML = ''; // Clear existing content

    // Iterate over userData object
    logoutButton.style.display = 'none'; // Hide logout button

    for (const key in userData) {
        if (userData.hasOwnProperty(key)) {
            const detailDiv = document.createElement('div');
            detailDiv.classList.add('user-detail');
            detailDiv.innerHTML = `<strong>${key.charAt(0).toUpperCase() + key.slice(1)}:</strong> <span>${userData[key]}</span>`;
            userDetailsContainer.appendChild(detailDiv);
        }
    }
}


function logOut() {
    auth.signOut().then(() => {
        console.log("User signed out");
        logoutButton.style.display = 'none'; // Hide logout button

        const accountContainer = document.getElementById('account-container'); // Ensure this is the correct ID
        if (accountContainer) {
            accountContainer.innerHTML = '<p>You have been logged out.</p>';
            // Or simply set to empty string if you don't want any message
            accountContainer.innerHTML = '';
        }

        const logoutButton = document.getElementById('logoutButton');

        if (logoutButton) {
            logoutButton.style.display = 'none';
        }


    }).catch((error) => {
        console.error("Error signing out:", error);
        // Handle any errors that occur during sign out
    });
}

function signIn() {
    var email = document.getElementById('emailInput').value;
    var password = document.getElementById('passwordInput').value;

    console.log('email is ' + email)
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in successfully
            console.log('Signed in user:', userCredential.user);
            document.getElementById('signup-container-parent').display.style = 'none'
            // You can redirect the user to another page or update the UI as needed
        })
        .catch((error) => {
            console.error('Error during sign in:', error);
            // Handle errors here, such as displaying a notification to the user
        });
}

