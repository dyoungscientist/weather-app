
const apiKey = "c035df33f6de7b736d849c9da3053081"; // OpenWeatherMap API key

function getCityFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('city');
}

function getWeatherImage(weatherMain) {
    switch (weatherMain.toLowerCase()) {
        case 'clear':
            return 'weather-icon.png';
        case 'clouds':
            return 'cloudy-color-icon.png';
        case 'rain':
            return 'day-cloud-rain-color-icon.png';
        case 'fog':
        case 'mist':
            return 'day-cloud-fog-color-icon.png';
        case 'thunderstorm':
            return 'day-cloud-rain-lightning-color-icon.png';
        case 'snow':
            return 'cloud-snow-color-icon.png';
        case 'wind':
            return 'cloud-wind-color-icon.png';
        case 'night clouds':
            return 'night-cloudy-color-icon.png';
        default:
            return 'weather-icon.png'; 
    }
}

function displayWeather(city) {
    const resultDiv = document.getElementById("weatherResult");
    if (!city) {
        resultDiv.innerHTML = "No city provided.";
        return;
    }
    resultDiv.innerHTML = "Loading...";
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`)
        .then(response => {
            if (!response.ok) throw new Error("City not found");
            return response.json();
        })
        .then(data => {
            const imageSrc = getWeatherImage(data.weather[0].main);
            const weather = `
                <img src="${imageSrc}" alt="${data.weather[0].main}" style="width:600px;height:600px;"><br>
                <strong>${data.name}, ${data.sys.country}</strong><br>
                ${data.weather[0].main} - ${data.weather[0].description}<br>
                Temperature: ${data.main.temp} °C<br>
                Humidity: ${data.main.humidity}%<br>
                Wind: ${data.wind.speed} m/s
            `;
            resultDiv.innerHTML = weather;
        })
        .catch(error => {
            window.location.href = "errorcode.html";
        });
}

document.addEventListener("DOMContentLoaded", function() {
    const city = getCityFromURL();
    displayWeather(city);
});
