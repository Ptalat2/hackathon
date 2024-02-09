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