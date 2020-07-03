// DOM variable for the input section
var inputEl = document.querySelector("#input-group");
// DOM variable for 
var cityNameEl = document.querySelector("#city-name");
// DOM variable for space with today's information
var todaysWeatherEl = document.querySelector("#todays-forecast");

// Function to handle the user submission
var formSubmitHandler = function(event) {
    event.preventDefault();
    
    // get value from input element
    var cityName = cityNameEl.value.trim().split(" ").join("");
    // Set the input field back to blank state
    cityNameEl.value = "";

    // Here I will call the getCoordinates function and pass the city name
    // as an argument
    getCoordinates(cityName);
};
// I need to wait on this to see if my shiz becomes active later
var getCoordinates = function(city) {
    apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=055086f19492c21b798cb63cdcd21457";

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                getAllWeather(data.coord.lat, data.coord.lon);
            });
        } else {
            alert("Error: " + response.statusText);
        }
    });
};

// Function to take my lat and long and long and grab onecall with it
var getAllWeather = function(lat, lon) {
    apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly&units=imperial&appid=055086f19492c21b798cb63cdcd21457";

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                displayCurrentWeather(data.current);
                displayFiveDay(data.daily);
            });
        } else {
            alert("Error: " + response.statusText);
        }
    });
};

// function to display today's weather
var displayCurrentWeather = function(currentWeather) {
    // Create div to hold all my today's weather info
    var contentEl = document.createElement("div");
    contentEl.textContent = currentWeather.temp;
    todaysWeatherEl.appendChild(contentEl);
};

// function to display today's weather
var displayFiveDay = function(fiveDayWeather) {
    console.log(fiveDayWeather);
};

inputEl.addEventListener("submit", formSubmitHandler);