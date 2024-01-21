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

function createAccount() {
    console.log('Create account button clicked')
    var email = document.getElementById('email_field').value;
    var password = document.getElementById('password_field').value;


    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        var user = auth.currentUser;
        console.log('Succesfully registered user with email ' + user.email)

        firebase.database().ref('foodBanks/' + user.uid).set({
            name: document.getElementById('name_field').value,
            email: email,
            phone: document.getElementById('phone_field').value,
            address: document.getElementById('address_field').value,
            services: document.getElementById('services_field').value,
            hours: document.getElementById('hours_field').value,
            affiliation: document.getElementById('affiliation_field').value,
            capacity: document.getElementById('capacity_field').value,
            additional_info: document.getElementById('additional_info_field').value
        });
    
        

    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log('Couldnt make account ' + errorMessage)
    });
}

document.addEventListener("DOMContentLoaded", function() {
    var user_typeRestaraunt = document.getElementById("type_restaurant");
    var user_typeFoodBank = document.getElementById("type_foodbank");
    var additionalInfoContainer = document.getElementById("additionalInfoContainer");


    user_typeFoodBank.addEventListener("click", function() {
        createAdditionalInfoDiv("Food Bank Specific Info", ["Name",
        "Address",
        "Email",
        "Phone Number",
        "Type of Service Offered",
        "Hours",
        "Capacity Information",
        "Additional Notes"]);
    });

    // Function to create and append a new div with input fields
    function createAdditionalInfoDiv(infoText, inputFields) {
        // Remove existing additional info div if any
        additionalInfoContainer.innerHTML = "";

        // Create a new div element
        var newDiv = document.createElement("div");
        newDiv.textContent = infoText;

        // Create input fields based on the array
        inputFields.forEach(function(fieldName) {
            var label = document.createElement("label");
            label.textContent = fieldName + ": ";
            
            var inputField = document.createElement("input");
            inputField.type = "text";
            inputField.placeholder = "Enter " + fieldName;

            newDiv.appendChild(label);
            newDiv.appendChild(inputField);
        });

        // Append the new div to the container
        additionalInfoContainer.appendChild(newDiv);
    }
});

