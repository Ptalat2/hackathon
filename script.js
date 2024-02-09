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

// Add click event listener
reportBtn.addEventListener('click', () => {
    // Change inner HTML of main
    let category = document.querySelector("#category").value = `Select category`
    let detail = document.querySelector("#details").value = "";
    let location = document.querySelector("#location").value = "";
    document.querySelector("#location").disabled = false;

    let minute = document.querySelector("#minute").value = ``
    let amPm = document.querySelector("#amPm").value = ''
    let hour = document.querySelector("#hour").value = ''
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(button => {
        button.checked = false;
    });
    form.classList.remove('hidden');;
    info.classList.add('hidden');
    mapView.classList.add('hidden');
    footer.classList.remove('hidden')
    header.classList.remove('hidden');
    bookmarksForm.classList.add('hidden');



    // Function to check if the user scrolled to the bottom
});

const submitBtn = document.querySelector('.submit');
    const confirmation = document.getElementById('report-success');

    submitBtn.addEventListener('click', (e) => {

        if (validateForm()) {
            snackbar.labelText = "Report Incomplete";
            snackbar.open();
        } else {
            form.classList.add('hidden');;
            info.classList.remove('hidden');


            setTimeout(function () {
                // Your code to execute after a 500ms delay
                confirmation.classList.remove('hidden');
                setTimeout(function () {
                    // Your code to execute after a 500ms delay
                    confirmation.classList.add('hidden');
                }, 3000);
            }, 300);
        }
    });

    function addMarker() {
        let category = document.querySelector("#category").value;
        let hour = document.querySelector("#hour").value;
        let minute = document.querySelector("#minute").value;
        let amPm = document.querySelector("#amPm").value;
        let detail = document.querySelector("#details").value;
        // Get current position
        navigator.geolocation.getCurrentPosition(function (position) {

            // Create marker
            const redIcon = L.icon({
                iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-red.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34]
            });

            map.setView([position.coords.latitude, position.coords.longitude]);

            const marker = L.marker([position.coords.latitude, position.coords.longitude], {
                icon: redIcon
            }).addTo(map);

            // Add popup
            const popup = L.popup({
                className: 'custom-popup'
            });

            marker.on('click', function (e) {
                popup
                    .setLatLng(e.latlng)
                    .setContent(`
        <h5>Report Info</h5>
        <h6>Status: Unconfirmed</h6>
       
        <p class = "text">  Type: ${category} <br> ${detail}<br> Time: ${hour}: ${minute} ${amPm}<br></p>
      `)
                    .openOn(map);
            });

        });

}

function addMarker_2(lat, lon) {
    let category = document.querySelector("#category").value;
    let hour = document.querySelector("#hour").value;
    let minute = document.querySelector("#minute").value;
    let amPm = document.querySelector("#amPm").value;
    let detail = document.querySelector("#details").value;
    // Get current position

    // Create marker
    const redIcon = L.icon({
        iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-red.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34]
    });

    map.setView([lat, lon]);

    const marker = L.marker([lat, lon], {
        icon: redIcon
    }).addTo(map);

    // Add popup
    const popup = L.popup({
        className: 'custom-popup'
    });

    marker.on('click', function (e) {
        popup
            .setLatLng(e.latlng)
            .setContent(`
    <h5>Report Info</h5>
    <h6>Status: Unconfirmed</h6>
   
    <p class = "text">  Type: ${category} <br> ${detail}<br> Time: ${hour}: ${minute} ${amPm}<br></p>
  `)
            .openOn(map);
    });



}


let count = 1;
let green;
let red;
// Get the bookmarks button and bookmark form


// Initialize the map
function initMap() {
    if (count != 5) {
        // Create map
        map = L.map('map').setView([41.878, -87.6298],
            13); // Set your initial map coordinates and zoom level.
        map.on('load', () => {
            map.setView([41.878, -87.6298],
                18); // Adjust the zoom level (15 in this case) to your preference.
        });
        // Tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="https://openstreetmap.org">OpenStreetMap</a>'
        }).addTo(map);

        // User marker
        const userMarker = L.marker([41.878, -87.6298]).addTo(map);

        // Report markers
        const greenIcon = L.icon({
            iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-green.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
        });

        // Create red icon
        const redIcon = L.icon({
            iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-red.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34]
        });

        // Add markers
        green = L.marker([41.888, -87.6298], {
            icon: greenIcon
        }).addTo(map);
        red = L.marker([41.868, -87.6298], {
            icon: redIcon
        }).addTo(map);
    }

    // Info window on marker click
    green.on('click', e => {
        const popup = L.popup({
            className: 'custom-popup'
        }).setContent(`
        <h5>Report Info</h5>
        <h6>Status: Confirmed</h6> 
        <h5>Individual caught with a firearm</h5>
    `);

        popup.setLatLng(e.latlng).openOn(map);
    });

    red.on('click', e => {
        const popup = L.popup({
            className: 'custom-popup'
        }).setContent(`
        <h5>Report Info</h5>
        <h6>Status: UnConfirmed</h6> 
        <h5>Individual caught trespassing</h5>
    `);

        popup.setLatLng(e.latlng).openOn(map);
    });




    const radioButtons = document.getElementsByName('location-option');

    // Loop through the radio buttons to check if one of them is selected
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            if (radioButton.value == "Yes") {
                // The selected radio button is found
                console.log(radioButton.checked)
                console.log(`Selected option: ${radioButton.value}`);

                addMarker();
            } else if (radioButton.value == "No") {
                // const address = "123 Main St, City, State, Country";
                let location = document.querySelector("#location").value;
                const nominatimUrl =
                    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`;

                fetch(nominatimUrl)
                    .then(response => response.json())
                    .then(data => {
                        if (data.length > 0) {
                            const latitude = data[0].lat;
                            const longitude = data[0].lon;
                            console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
                            addMarker_2(latitude, longitude)
                        } else {
                            console.log('Error: Unable to retrieve coordinates for the address.');

                        }
                    })
                    .catch(error => {
                        console.log('Error:', error);
                    });

            }

        }
    }

    count = 5;

}

let radioButto = document.getElementsByName('location-option');

// Loop through the radio buttons to check if one of them is selected
for (const radioButton of radioButto) {

    radioButton.addEventListener('click', e => {
        if (radioButton.checked) {
            if (radioButton.value == "Yes") {
                // The selected radio button is found
                console.log(radioButton.checked)
                console.log(`Selected option: ${radioButton.value}`);
                document.querySelector("#location").disabled = true;
            } else {
                document.querySelector("#location").disabled = false;

            }

        }

    })
}

 // Add an event listener for a button with the ID "search"
 search.addEventListener('click', () => {
    // Hide footer and info elements
    header.classList.add('hidden');
    info.classList.add('hidden');
    form.classList.add('hidden');
    bookmarksForm.classList.add('hidden');

    // Show the map view
    mapView.classList.remove('hidden');

    // Initialize the map
    initMap();
});

home.addEventListener('click', () => {
    header.classList.remove('hidden');
    info.classList.remove('hidden');
    form.classList.add('hidden');
    footer.classList.remove('hidden');
    mapView.classList.add('hidden');
    bookmarksForm.classList.add('hidden');

    // Show the map view
    mapView.classList.add('hidden');
})

 // Get the settings button and dropdown content
 const settingsBtn = document.getElementById('settings');
 const settingsDropdown = document.getElementById('settingsDropdown');
 const dropdownOptions = document.querySelectorAll('.dropdown-option');

 // Add click event listener to the document to close the dropdown when clicking outside of it
 document.addEventListener('click', function (e) {
     if (!settingsBtn.contains(e.target) && !settingsDropdown.contains(e.target)) {
         settingsDropdown.classList.add('hidden');
     }
 });



 // Toggle the dropdown when clicking the settings button
 settingsBtn.addEventListener('click', function () {
     if (settingsDropdown.style.display === 'block') {
         settingsDropdown.classList.add('hidden');
     } else {
         settingsDropdown.classList.remove('hidden');
     }
 });

 // Handle clicks on dropdown options
 dropdownOptions.forEach(function (option) {
     option.addEventListener('click', function (e) {
         // You can add logic here to handle clicks on specific options
         // For now, we'll just log the clicked option to the console
         console.log('Clicked on:', e.target.innerText);

         // Close the dropdown
         settingsDropdown.classList.add('hidden');
     });
 });



 // Add click event listener to the Bookmarks button
 bookmarksBtn.addEventListener('click', () => {
     // Hide other sections and show the bookmark form
     settingsDropdown.classList.add('hidden');
     form.classList.add('hidden');
     info.classList.add('hidden');
     mapView.classList.add('hidden');
     bookmarksForm.classList.remove('hidden');
     document.getElementById('bm-name').value = '';
     document.getElementById('bm-location').value = '';


 });


 // Add click event listener to the "Add Bookmark" button in the bookmark form

 const addBookmarkBtn = document.querySelector('.bookmark .submit');
 addBookmarkBtn.addEventListener('click', () => {
     // Your code to handle bookmark submission (similar to the previous example)
     const bookmarkName = document.getElementById('bm-name').value;
     const bookmarkLocation = document.getElementById('bm-location').value;

     // Validate that both name and location are provided
     if (bookmarkName && bookmarkLocation) {
         // Display the bookmark information in the main home screen under recent activity
         const recentActivity = document.querySelector('.info');
         const bookmarkInfo = document.createElement('p');
         bookmarkInfo.textContent = `New Bookmark: ${bookmarkName} - ${bookmarkLocation}`;
         recentActivity.appendChild(bookmarkInfo);

         // Hide the bookmarks form
         bookmarksForm.classList.add('hidden');
         // Show the main home screen
         info.classList.remove('hidden');
     } else {
         // Display an error message or handle the case where the user didn't provide both name and location
     }
 });
