    const reportButton = document.getElementById('reportButton');
        const reportForm = document.getElementById('reportForm');
        const lowerHalf = document.getElementById('lowerHalf');
        const reportBtn = document.getElementById('report');
        const searchButton = document.getElementById('search-button')
        const map_container = document.querySelector('.map_container');
        const map_tab = document.querySelector('.map_tab');
        const legend = document.querySelector('.legend');
        const searchSection = document.querySelector('.searchSection');
        let search_t = document.getElementById('searchText');
        var blueIcon = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
        var redIcon = 'https://maps.google.com/mapfiles/kml/shapes/caution.png';
        var yellowIcon = 'https://maps.google.com/mapfiles/kml/paddle/ylw-blank.png';

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
                // } else {
                return false;
            }
        }
        reportButton.addEventListener('click', () => {
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
            reportForm.classList.remove('hidden');
            lowerHalf.classList.add('hidden');
            bookmarksForm.classList.add("hidden");
            searchSection.classList.add('hidden');


        });

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


        const submitBtn = document.querySelector('.submit-1');
        const confirmation = document.getElementById('report-success');
        const searchText = document.querySelector('searchText');
        const snackbar = new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar'));
        const bookmarksBtn = document.getElementById('bookmarksBtn');
        const bookmarksForm = document.querySelector('.bookmark');
        const logo = document.querySelector(".logo");

        logo.addEventListener('click', () => {
            lowerHalf.classList.remove("hidden");
            bookmarksForm.classList.add("hidden");
            map_container.classList.add('hidden');
            legend.classList.add('hidden');
            reportForm.classList.add('hidden');
            searchSection.classList.remove('hidden');

        })

        bookmarksBtn.addEventListener('click', () => {
            // Hide other sections and show the bookmark form
            lowerHalf.classList.add("hidden");
            bookmarksForm.classList.remove("hidden");
            map_container.classList.add('hidden');
            legend.classList.add('hidden');
            reportForm.classList.add('hidden');
            searchSection.classList.add('hidden');



            document.getElementById('bm-name').value = '';
            document.getElementById('bm-location').value = '';
        });
        const addBookmarkBtn = document.querySelector('.bookmark .r_submit');

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
                reportForm.classList.add('hidden');
                lowerHalf.classList.remove('hidden');
                bookmarksForm.classList.add("hidden");
                map_container.classList.add('hidden');
                legend.classList.add('hidden');
                searchSection.classList.remove('hidden');


            } else {
                snackbar.labelText = "Incomplete";
                snackbar.open();
            }
        });
        var blueIcon = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
        var redIcon = 'https://maps.google.com/mapfiles/kml/shapes/caution.png';
        // Initialize Google Map
        var map;

        let i = 0;

        function initMap() {
            // Get user's geolocation
            navigator.geolocation.getCurrentPosition(function (position) {
                var userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                // Center the map on the user's location
                map = new google.maps.Map(document.getElementById('map'), {
                    center: userLocation,
                    zoom: 15
                });
                crimeData();
                // Create a marker for the user's location
                var marker = new google.maps.Marker({
                    position: userLocation,
                    map: map,
                    icon: blueIcon,
                    title: 'Your Location'
                });



                // Show legend on map hover
                var legend = document.querySelector('.legend');
                map.addListener('mouseover', function () {
                    legend.style.opacity = '1';
                });
                map.addListener('mouseout', function () {
                    legend.style.opacity = '0';
                });

                // Show legend on map touchstart
                map.addListener('touchstart', function () {
                    legend.style.opacity = '1';
                });

                // Hide legend on map touchend
                map.addListener('touchend', function () {
                    legend.style.opacity = '0';
                });

            }, function (error) {
                console.log('Error getting user location:', error);
            });

            i = 5;
        }



        function newMarker() {
            if (i == 5) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    var userLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    var currentLocationMarker = new google.maps.Marker({
                        position: userLocation,
                        map: map,
                        icon: {
                            url: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png', // Marker icon
                            scaledSize: new google.maps.Size(20, 20) // Marker size
                        },
                        title: 'Your Location'
                    });

                    let category = document.querySelector("#category").value;
                    let hour = document.querySelector("#hour").value;
                    let minute = document.querySelector("#minute").value;
                    let amPm = document.querySelector("#amPm").value;
                    let detail = document.querySelector("#details").value;
                    currentLocationMarker.addListener('click', function () {
                        // Get and display report info in an info window
                        var reportInfo =
                            ` <h5>Report Info</h5>
        <h6>Status: Unconfirmed</h6>
       
        <p class = "text">  Type: ${category} <br> ${detail}<br> Time: ${hour}: ${minute} ${amPm}<br></p>`; // Replace with actual report info
                        var infoWindow = new google.maps.InfoWindow({
                            content: reportInfo
                        });
                        infoWindow.open(map, currentLocationMarker);
                    });
                })
            }

        }

        function addMarker(location) {
            var marker = new google.maps.Marker({
                position: location,
                map: map
            });


        }

        function addReportmarker(geocoder, address) {
            console.log("this the address: " + address);
            geocoder.geocode({
                'address': address
            }, function (results, status) {
                if (status === 'OK') {
                    var userLocation = results[0].geometry.location;
                    var currentLocationMarker = new google.maps.Marker({
                        position: userLocation,
                        map: map,
                        icon: yellowIcon,
                        title: 'Your Location',

                    });
                    let category = document.querySelector("#category").value;
                    let hour = document.querySelector("#hour").value;
                    let minute = document.querySelector("#minute").value;
                    let amPm = document.querySelector("#amPm").value;
                    let detail = document.querySelector("#details").value;
                    currentLocationMarker.addListener('click', function () {
                        // Get and display report info in an info window
                        var reportInfo =
                            ` <h5>Report Info</h5>
        <h6>Status: Unconfirmed</h6>
       
        <p class = "text">  Type: ${category} <br> ${detail}<br> Time: ${hour}: ${minute} ${amPm}<br></p>`; // Replace with actual report info
                        var infoWindow = new google.maps.InfoWindow({
                            content: reportInfo
                        });
                        infoWindow.open(map, currentLocationMarker);
                    });

                    map.setCenter(userLocation); // Centering the map
                } else {
                    alert('Geocode was not successful for the following reason: ' + status);
                }


            });
        }

        function geocodeAddress(geocoder, address) {
            geocoder.geocode({
                'address': address
            }, function (results, status) {
                if (status === 'OK') {
                    var userLocation = results[0].geometry.location;
                    addMarker(userLocation);
                    map.setCenter(userLocation); // Centering the map

                } else {
                    alert('Geocode was not successful for the following reason: ' + status);
                }
            });
        }



        // map_tab.addEventListener('click', () => {
        //     lowerHalf.classList.add('hidden');
        //     map_container.classList.remove('hidden');
        //     legend.classList.remove('hidden');
        //     bookmarksForm.classList.add("hidden");
        //     reportForm.classList.add('hidden');;
        //     searchSection.classList.remove('hidden');

        //     initMap();


        // })

        submitBtn.addEventListener('click', (e) => {

            if (validateForm()) {
                snackbar.labelText = "Report Incomplete";
                snackbar.open();
            } else {
                setTimeout(function () {
                    // Your code to execute after a 500ms delay
                    confirmation.classList.remove('hidden');
                    setTimeout(function () {
                        // Your code to execute after a 500ms delay
                        confirmation.classList.add('hidden');
                        for (const radioButton of radioButtons) {
                            if (radioButton.checked) {
                                if (radioButton.value == "Yes") {
                                    // The selected radio button is found
                                    newMarker();
                                    reportForm.classList.add('hidden');;
                                    lowerHalf.classList.add('hidden');
                                    map_container.classList.remove('hidden');
                                    legend.classList.remove('hidden');
                                    reportForm.classList.add('hidden');
                                    searchSection.classList.remove('hidden');

                                } else if (radioButton.value == "No") {
                                    var Input = document.querySelector("#location").value;
                                    console.log(Input);
                                    if (Input) {
                                        var geocoder = new google.maps.Geocoder();
                                        addReportmarker(geocoder, Input);
                                    } else {
                                        alert(
                                            "No address entered. Please enter a valid address."
                                        );
                                    }



                                    reportForm.classList.add('hidden');;
                                    lowerHalf.classList.add('hidden');
                                    map_container.classList.remove('hidden');
                                    legend.classList.remove('hidden');
                                    reportForm.classList.add('hidden');
                                    searchSection.classList.remove('hidden');
                                }

                            }


                        }
                    }, 1500);
                }, 100);
                reportForm.classList.add('hidden');;
                lowerHalf.classList.add('hidden');
                map_container.classList.add('hidden');
                legend.classList.add('hidden');
                reportForm.classList.add('hidden');
                const radioButtons = document.getElementsByName('location-option');
                let yes = 0;
                initMap();
                // Loop through the radio buttons to check if one of them is selected


            }




        });


        searchButton.addEventListener('click', e => {
            e.preventDefault(); // Prevent default form submission behavior

            userInput = document.querySelector('#searchText').value;
            if (userInput) {
                var geocoder = new google.maps.Geocoder();
                geocodeAddress(geocoder, userInput);
            } else {
                alert("No address entered. Please enter a valid address.");
            }

            // Geocode function to convert address to coordinates


        })

        search_t.addEventListener('click', e => {
            reportForm.classList.add('hidden');;
            lowerHalf.classList.add('hidden');
            map_container.classList.remove('hidden');
            legend.classList.remove('hidden');
            reportForm.classList.add('hidden');
            // searchSection.classList.remove('hidden');

        })

        async function crimeData() {
            var geocoder = new google.maps.Geocoder();
            await fetch('crime.json')
                .then(response => response.json())
                .then(data => {
                    // Iterate over each entry in the JSON data
                    data.forEach(entry => {
                        // Create a marker for each entry
                        geocoder.geocode({
                                'address': entry.Location
                            }, function (results, status) {
                                if (status === 'OK') {
                                    var userLocation = results[0].geometry.location;
                                    const marker = new google.maps.Marker({
                                        position: userLocation,
                                        map: map,
                                        title: entry.Name,
                                        icon: {
                                            url: entry.icon, // URL of the custom icon
                                            scaledSize: new google.maps.Size(35,
                                                35) // Desired marker size
                                        }


                                    });

                                    const infoWindow = new google.maps.InfoWindow({
                                        content: `
                                                        <h3>${entry.Category}</h3>
                                                        <p><strong>Details:</strong> ${entry.Details}</p>
                                                        <p><strong>Time:</strong> ${entry.Time}</p>
                                                        <p><strong>Name:</strong> ${entry.Name}</p>
                                                        `
                                    });

                                    marker.addListener('click', () => {
                                        infoWindow.open(map, marker);
                                    });
                                }
                            })
                            .catch(error => {
                                console.error('Error fetching JSON:', error);
                            });
                    })


                });







        }
