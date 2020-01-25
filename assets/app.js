$(document).ready(function () {

            var firebaseConfig = {
                apiKey: "AIzaSyCeshwfwLmlh2uwM6BLs7J4SmoUbmZvoGQ",
                authDomain: "unboreme-b99d9.firebaseapp.com",
                databaseURL: "https://unboreme-b99d9.firebaseio.com",
                projectId: "unboreme-b99d9",
                storageBucket: "unboreme-b99d9.appspot.com",
                messagingSenderId: "1080038770107",
                appId: "1:1080038770107:web:4c8db7157faf340aaa309e"
            };

            firebase.initializeApp(firebaseConfig);

            database = firebase.database()


            var searchTerm = $("#searchTerm").val().trim();
            var category = $("#category").val().trim();
            var state = $("#state").val().trim();
            var city = $("#city").val().trim();
            var radius = $("#radius").val().trim();



            // These variables hold will feed data to the querlyURL. The variable values will come from user input. Currently some of the variables hold temporary data for testing purposes.
            var searchTerm = $(this).attr("data-name");
            var where = $(this).attr("data-name");
            var radius = $(this).attr("data-name");
            var category = $(this).attr("data-name");
            var when = "future";
            var results = "25"
            var key = "vMvwtd4qCcNr8hZL";
            var oAuthKey = "f294b0ab520483c96e63"
            var oAuthSecret = "7f051c9da5f92bfbe8e3"
            var proxyURL = "https://cors-anywhere.herokuapp.com/"



            var queryURL = "http://api.eventful.com/json/events/search?app_key=" + key + "&q=" + searchTerm + "&l=" + where + "&within=" + radius + "&t=" + when + "&c=" + category + "&page_size=" + results + "&oauth_consumer_key=" + oAuthKey + "&oauth_signature_method=HMAC-SHA1&oauth_version=1.0&scheme=https";



            function searchEvents(search) {
                // queryURL to pull data from Eventful.com. The proxy URL is necessary to circumvent CORS rejection.
              
                $.ajax({
                    url: proxyURL + queryURL,
                    method: "GET",
                    crossDomain: true
                }).then(function (response) {
                    // logging objest to console
                    console.log(response);

                    for (var i = 0; i < 1; i++) {
                        // Console logging response.events to 'see' JSON object
                        //  console.log(JSON.parse(response));
                        var temp = JSON.parse(response);
                        console.log(temp.events.event[0].latitude);
                        console.log(temp.events.event[0].longitude);
                        var lat = temp.events.event[i].latitude;
                        var lng = temp.events.event[i].longitude;
                    }

                    // first the entire response must be parsed from its JSON origin
                    temp = JSON.parse(response)
                    // then we can grab the important event information from the nest
                    eventData = temp.events.event
                    console.log(eventData)
                    for (var i = 0; i < eventData.length; i++) {
                        newCountry = $("<p>")
                        newCountry.text(eventData[i].country_name)
                        newCity = $("<p>")
                        newCity.text(eventData[i].city_name)
                        newTime = $("<p>")
                        newTime.text(eventData[i].start_time)
                        newTitle = $("<p>")
                        newTitle.text(eventData[i].title)
                        newEvent = $("<div>")
                        newEvent.append(newCountry, newCity, newTime, newTitle)
                        $("#resultCard").append(newEvent)
                    }


                });

            };


        
        // Event handler for user clicking the submit button
        $("#submitSearch").click(function (event) {
            event.preventDefault()
            // Storing the search queries
            var searchTerm = $("#searchTerm").val().trim();
            var category = $("#category").val().trim();
            var state = $("#state").val().trim();
            var city = $("#city").val().trim();
            var radius = $("#radius").val().trim();
            var where = stae + city;

            // Running the searchEvents function(passing search queries as arguments)
            searchEvents(searchTerm, category, where, radius);
        })



        database.ref().on("value", function (snapshot) {

            console.log(snapshot.val())

})});