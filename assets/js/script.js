// DOM variable for the input section
var inputEl = document.querySelector("#input-group");
// DOM variable for 
var cityNameEl = document.querySelector("#city-name");
// DOM variable for space with today's information
var todaysWeatherEl = document.querySelector("#todays-forecast");
// DOM variable for space with five day forecast
var fiveDayEl = document.querySelector("#five-day-forecast");
// I think I need a global variable for current city
var currentCity = "";
// today's date
var today = moment().format("M/D/YYYY");

// Function to handle the user submission
var formSubmitHandler = function(event) {
    event.preventDefault();
    
    // get value from input element
    // var cityName = cityNameEl.value.trim();
    currentCity = cityNameEl.value.trim();
    // Set the input field back to blank state
    cityNameEl.value = "";

    // Here I will call the getCoordinates function and pass the city name
    // as an argument
    getCoordinates(currentCity);
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
    // Empty content from the last search
    todaysWeatherEl.innerHTML = "";
    // Create div to hold all my today's weather info
    var contentEl = document.createElement("div");
    // display all of today's info via innerHTML
    contentEl.innerHTML = "<h4>" + currentCity + " (" + today + ") <img src='http://openweathermap.org/img/w/" + currentWeather.weather[0].icon + ".png'></img></h4><p>Temperature: " + currentWeather.temp + " &#8457</p><p>Humidity: " + currentWeather.humidity + "%</p><p>Wind Speed: " + currentWeather.wind_speed + " MPH</p><p>UV Index: " + currentWeather.uvi + "</p>";
    // Append all of today's info to the today's weather section
    todaysWeatherEl.appendChild(contentEl);
    console.log(currentWeather);
    //<img src='http://openweathermap.org/img/w/" + currentWeather.weather[0].icon + ".png'></img>
};

// function to display the five day forecast
var displayFiveDay = function(fiveDayWeather) {
    // Clear data from previous search
    fiveDayEl.innerHTML = "";
    
    // for loop to get data on all five upcoming days
    for (var i = 1; i < 6; i++) {
    var forecastDate = moment().add(i, 'days').format("M/D/YYYY");
    var forecastBadge = document.createElement("div");
    forecastBadge.setAttribute("class", "badge badge-primary p-3 text-left");
    forecastBadge.innerHTML = "<h6>" + forecastDate + "</h6><img src='http://openweathermap.org/img/w/" + fiveDayWeather[i].weather[0].icon + ".png'></img><p>Temp: " + fiveDayWeather[i].temp.max + " &#8457</p><p>Humidity: " + fiveDayWeather[i].humidity + "%</p>";
    fiveDayEl.appendChild(forecastBadge);
    }

    console.log(fiveDayWeather);
};

inputEl.addEventListener("submit", formSubmitHandler);