// This is the javascript file

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
