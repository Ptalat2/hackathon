 // Get main elements
 const main = document.querySelector('main');
 const form = document.querySelector('form')
 const info = document.querySelector('.info');
 const reportBtn = document.getElementById('report');
 const footer = document.querySelector("footer");
 const header = document.querySelector("header");
 const search = document.querySelector("#search");
 const mapView = document.querySelector(".map-ct");
 const home = document.querySelector("#home");
 const bookmarksBtn = document.getElementById('bookmarksBtn');
 const bookmarksForm = document.querySelector('.bookmark');
 const snackbar = new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar'));

 function getcoords(address) {
    //const address = "123 Main St, City, State, Country";
    const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;

    fetch(nominatimUrl)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const latitude = data[0].lat;
                const longitude = data[0].lon;
                console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

                return [latitude, longitude];
            } else {
                console.log('Error: Unable to retrieve coordinates for the address.');
                return undefined;
            }
        })
        .catch(error => {
            console.log('Error:', error);
        });
}

function validateForm() {
    // const location = document.getElementById('location').value;
    const category = document.getElementById('category').value;
    const details = document.getElementById('details').value;
    const radioButtons = document.getElementsByName('location-option');
    let yes = 0;
    // Loop through the radio buttons to check if one of them is selected
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            if (radioButton.value == "Yes") {
                // The selected radio button is found
                yes = 5;

            }

        }
    }

    if (category === 'Select category' || details.trim() === '') {
        return true;
        // You can also show an alert or perform other actions to notify the user.
    } else {
        return false;
    }
}