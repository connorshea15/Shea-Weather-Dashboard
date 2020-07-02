// DOM variable for the input section
var inputEl = document.querySelector("#input-group");
var cityNameEl = document.querySelector("#city-name")

// I need to wait on this to see if my shiz becomes active later
var getWeather = function() {
    apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=229c1683379f39bf8bd6307cd867b979";

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
            });
        } else {
            alert("Error: " + response.statusText);
        }
    });
};

var acceptInput = function(event) {
    event.preventDefault();
    
    // get value from input element
    var cityName = cityNameEl.value.trim();
    console.log(cityName);

    // Here I will call the getWeather function and pass the city name
    // as an argument
};

inputEl.addEventListener("submit", acceptInput);