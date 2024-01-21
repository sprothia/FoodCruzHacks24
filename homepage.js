function openPage(page) {
    window.location.href = page;
}

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

var db = firebase.database();

// var starCountRef = firebase.database().ref('/restaurants');
// starCountRef.on('value', (snapshot) => {
//   const data = snapshot.val();
//   updateStarCount(postElement, data);
// });

const dbRef = firebase.database().ref('restaurants/');
dbRef.once('value', (snapshot) => {
  if (snapshot.exists()) {
    // console.log(snapshot.val());
    const data = snapshot.val()
    for (key in data) {
        console.log(data[key])
        var button = document.createElement('button');
        button.className = 'restaurant-button';
        button.onclick = function() {
            console.log('hello');
            // Add additional JavaScript actions here if needed
        };
        var restaurantDetails = document.createElement('div');
        restaurantDetails.className = 'restaurant-details';
        var restaurantImage = document.createElement('div');
        restaurantImage.className = 'restaurant-image';
        var image = document.createElement('img');
        image.src = data[key].img;
        image.style = 'width:90%;';
        restaurantImage.appendChild(image);
        restaurantImage.style = 'width:50%; margin-top: -7%; float:left;';
        var restaurantInfo = document.createElement('div');
        restaurantInfo.className = 'restaurant-info';
        restaurantInfo.style = 'margin-left: 50%;'
        var h3 = document.createElement('h3');
        h3.style.fontWeight = '600';
        h3.textContent = data[key].name;
        var starSpan = document.createElement('span');
        starSpan.style.color = 'yellow';
        starSpan.innerHTML = '<i class="fa-solid fa-star"></i> ' + data[key].rating;
        var h4 = document.createElement('h4');
        h4.textContent = data[key].location;
        var buildingIcon = document.createElement('i');
        buildingIcon.className = 'fa-solid fa-building';
        var buildingText = document.createTextNode(data[key].foodType);
        restaurantInfo.appendChild(h3);
        restaurantInfo.appendChild(starSpan);
        restaurantInfo.appendChild(h4);
        restaurantInfo.appendChild(buildingIcon);
        restaurantInfo.appendChild(buildingText);
        restaurantDetails.appendChild(restaurantImage);
        restaurantDetails.appendChild(restaurantInfo);
        button.appendChild(restaurantDetails);
        document.getElementById('scrollable-restaurants').appendChild(button);
    }
  } else {
    console.log("No data available");
  }
})
.catch((error) => {
  console.error(error);
});







window.onload = function() {

    // HOUSE ADDRESS
    var address = '1900 Vista Ave, Sierra Madre, CA'

    // GETTING HOUSE COORDINATES
    getCoordinates(address, function(error, coordinates) {
        if (error) {
            console.log(error);
        } else {

            latitude = coordinates.latitude;
            longitude = coordinates.longitude;

            create3DMapAndGetHouseDirection(latitude, longitude)

        }
    });

};

// GETTING HOUSE COORDINATES
function getCoordinates(address, callback) {
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({'address': address}, function(results, status) {
        if (status === 'OK') {
            var latitude = results[0].geometry.location.lat();
            var longitude = results[0].geometry.location.lng();
            callback(null, {latitude, longitude});
        } else {
            callback('Geocode was not successful for the following reason: ' + status);
        }
    });
}

function initMap() {

}

function create3DMapAndGetHouseDirection(latitude, longitude) {

    // CREATE 3D MAP
    var mapOptions = {
        center: new google.maps.LatLng(latitude, longitude),
        zoom: 20,
        mapTypeId: 'satellite', 
        tilt: 45,
        zoomControl: true,
        mapTypeControl: true,
        scaleControl: true,
        streetViewControl: true,
        rotateControl: true,
        fullscreenControl: true
    }


    var map = new google.maps.Map(document.getElementById("map"), mapOptions);


    var marker = new google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: map,
    });

    var circle = new google.maps.Circle({
        map: map,
        radius: 3,    // Size in meters
        fillColor: '#AA0000',
        fillOpacity: 0.3,
        strokeColor: '#AA0000',
        strokeOpacity: 0.8,
        strokeWeight: 2
    });
    
    circle.bindTo('center', marker, 'position');

}
