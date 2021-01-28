function fetchWeatherMapData(){
    fetch('http://maps.openweathermap.org/maps/2.0/weather/CL/{z}/{x}/{y}&appid=e1558fe0d8dcc08923d8122663466af2')
    .then(response => {
        return response.json();
    })
    .then(viewWeatherMap());
}


var mymap = L.map('weather-map').setView([51.505, -0.09], 13);
