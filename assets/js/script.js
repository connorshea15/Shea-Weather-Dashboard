// DOM variable for the input section
var inputEl = document.querySelector("#input-group");
// DOM variable for 
var cityNameEl = document.querySelector("#city-name");
// DOM variable for space with today's information
var todaysWeatherEl = document.querySelector("#todays-forecast");
// DOM variable for space with five day forecast
var fiveDayEl = document.querySelector("#five-day-forecast");
// DOM variable to reference list space for search history
var cityListEl = document.querySelector("#city-list");
var fiveDayHeading = document.querySelector("#five-day-title");
// I think I need a global variable for current city
var currentCity = "";
// today's date
var today = moment().format("M/D/YYYY");
// Array to hold my search history
var listedCities = [];

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

    // conditional to append and save city only if it is not listed yet
    if (listedCities.includes(currentCity)) {
        return;
    } else {
        // Function to append city to search history and save to local storage
        listCity(currentCity);
    }
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
    contentEl.innerHTML = "<h4>" + currentCity + " (" + today + ") <img src='http://openweathermap.org/img/w/" + currentWeather.weather[0].icon + ".png'></img></h4><p>Temperature: " + currentWeather.temp + " &#8457</p><p>Humidity: " + currentWeather.humidity + "%</p><p>Wind Speed: " + currentWeather.wind_speed + " MPH</p><p>UV Index: <span id='uv-index'>" + currentWeather.uvi + "</span></p>";
    // Append all of today's info to the today's weather section
    todaysWeatherEl.appendChild(contentEl);

    // DOM variable to represent the uv index span
    var uvIndexColor = document.getElementById("uv-index");

    // conditional to color my uv index
    if (currentWeather.uvi < 6) {
        uvIndexColor.setAttribute("class", "badge badge-info");
    } else if (currentWeather.uvi > 6 && currentWeather.uvi < 8) {
        uvIndexColor.setAttribute("class", "badge badge-success");
    } else if (currentWeather.uvi > 8 && currentWeather.uvi < 11) {
        uvIndexColor.setAttribute("class", "badge badge-warning");
    } else if (currentWeather.uvi > 11) {
        uvIndexColor.setAttribute("class", "badge badge-danger");
    }
    
    console.log(currentWeather);
};

// function to display the five day forecast
var displayFiveDay = function(fiveDayWeather) {
    // Clear data from previous search
    fiveDayEl.innerHTML = "";
    
    fiveDayHeading.textContent = "Five Day Forecast";
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

var listCity = function(cityName) {
    // Create new list element
    var newCityEl = document.createElement("li");
    // assign new city name to new list element
    newCityEl.textContent = cityName;
    newCityEl.setAttribute("class", "list-group-item");
    cityListEl.appendChild(newCityEl);
    listedCities.push(cityName);
    saveCities();
};

// Save a searched city to local storage
var saveCities = function() {
    localStorage.setItem("listedCities", JSON.stringify(listedCities));
};

// load saved cities after page refresh
var loadCities = function() {
    listedCities = JSON.parse(localStorage.getItem("listedCities"));

    // if local storage is null, recreate the array to hold tasks
    if (!listedCities) {
        listedCities = [];
    }

    // Loop through our saved cities and add to the search history
    for (i = 0; i < listedCities.length; i++) {
        // Create new list element
        var newCityEl = document.createElement("li");
        // assign new city name to new list element
        newCityEl.textContent = listedCities[i];
        newCityEl.setAttribute("class", "list-group-item");
        cityListEl.appendChild(newCityEl);
    }
};

inputEl.addEventListener("submit", formSubmitHandler);
loadCities();