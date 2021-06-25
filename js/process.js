const searchInput = document.querySelector('.search');

searchInput.addEventListener('keypress', setQuery);

fetchLocation('Manila'); //display current weather data of manila

//set weather map ----------------------
var weatherMap = L.map('weathermap', {
    minZoom: 2,
    maxZoom: 12
})

var map = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.openweathermap.org/">OpenWeatherMap</a>'
}).addTo(weatherMap);

var owm = L.tileLayer(`https://tile.openweathermap.org/map/precipitation/{z}/{x}/{y}.png?appid=e1558fe0d8dcc08923d8122663466af2`).addTo(weatherMap);
weatherMap.setView([14.5, 120.9], 5);

function setQuery(evt) {
    if(evt.keyCode == 13) {
        fetchLocation(searchInput.value);
    }
}

async function fetchLocation(query) {
    
    let res = await fetch('http://api.openweathermap.org/data/2.5/weather?q='+query+'&units=metric&appid=e1558fe0d8dcc08923d8122663466af2')

    let data = await res.json()

    displayCurrentData(data); 
}

async function fetchForecastData(lat, lon){

    let res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&units=metric&appid=e1558fe0d8dcc08923d8122663466af2`)
     
    let data = await res.json()

    displayForecastData(data)
}

function buildDate(date) {

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    let Day = days[date.getDay()];
    let currentDate = date.getDate();
    let month = months[date.getMonth()];
    let year = date.getFullYear();

    return `${Day} ${currentDate} ${month} ${year}`;

}

function loadingAnim(){
    let main = document.querySelector('.main-content');
    let loading = document.querySelector('.page-loader');

    main.style.display = "block";
    loading.style.display = "none";
}

function displayCurrentData(data) {

    fetchForecastData(data.coord.lat, data.coord.lon); //sends longitude and latitude location to the forecast function
    
    $('.city').text(data.name +", "+data.sys.country)

    $('.temp').text(`${Math.round(data.main.temp)}°`)
    
    $('.weather').text(toTitleCase(data.weather[0].main))
    
    $('.main-icon').html(getWeatherIcon(data.weather[0].id))
    
    getWeatherBg(data.weather[0].id)
    
    $('#g-feels-like').text(`Feels like ${Math.round(data.main.feels_like)}°C`)
    
    $('#g-location').text(data.name +", "+data.sys.country)
    
    $('#wind-speed').text(`${data.wind.speed} m/s`)
    
    $('#pressure').text(`${data.main.pressure} pHA`)
    
    $('#humidity').text(data.main.humidity + ' %')
    
    $('#visibility').text(Math.round(data.visibility / 1000) + ' km')
}

function displayForecastData(data)
{
    console.log(data);

    displayChart(data);

    weatherMap.setView([data.lat, data.lon], 8);

    let week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    let date = new Date();

    for(var i = 0; i < 8; i++){
        $(`#weather-${i + 1}`).text(data.daily[i].weather[0].main)

        $(`#day-${i + 1}`).text(week[(date.getDay() + 1 + i) % 7])

        $(`#icon-${i + 1}`).html(getWeatherIcon(data.daily[i].weather[0].id))

        $(`#day-${i + 1}-temp`).text(`${Math.round(data.daily[i].temp.max)} / ${Math.round(data.daily[i].temp.min)}°C`)
    }

    $('#g-current-temp').text(`${Math.round(data.current.temp)}°C`);

    $('.date').text(moment().tz(`${data.timezone}`).format('dddd, MMMM DD YYYY'));

    $('#g-time').text(moment().tz(`${data.timezone}`).format("YYYY/MM/DD hh:mm"));
}


function toTitleCase(str) {
    
    return str.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );

}

function setBackground(weather){

    let bg = document.querySelector('body');
    bg.style.backgroundImage = `url("images/weather-${weather}.svg")`;

}

function getWeatherBg(id){

    if(id >= 200 && id <= 232){ //thunder
        setBackground('rain');
    }
    else if(id >= 300 && id <= 321){ //drizzle
        setBackground('rain');
    }
    else if(id >= 500 && id <= 531){ //rain
        setBackground('rain');
    }
    else if(id >= 600 && id <= 622){ //snow
        setBackground('snow');
    }
    else if(id >= 700 && id <= 781){ //smog
        setBackground('fog');
    }
    else if(id == 800){ //sunny/clear
        setBackground('sunny');
    }
    else if(id >= 801 && id <= 804){ //cloud
        setBackground('cloudy');
    }
    else {
        console.log("Error: weather id not found");
    }

}

function getWeatherIcon(id)
{
    if(id >= 200 && id <= 232){ return '<i class="fas fa-bolt fa-2x"></i>' } //Thunder

    else if (id >= 300 && id <= 321){ return '<i class="fas fa-cloud-rain fa-2x"></i>' }  //Drizzle
    
    else if(id >= 500 && id <= 531){ return '<i class="fas fa-cloud-showers-heavy fa-2x"></i>' } //rain
    
    else if(id >= 600 && id <= 622){ return '<i class="far fa-snowflake fa-2x"></i>' } //Snow
    
    else if(id >= 700 && id <= 781){ return '<i class="fas fa-smog fa-2x"></i>' }   //Smog
    
    else if(id == 800){ return '<i class="fas fa-sun fa-2x"></i>'} //sunny/clear
    
    else if(id >= 801 && id <= 804){ return '<i class="fas fa-cloud fa-2x"></i>' }
    
    else { console.log("Error: weather id not found") }
}

function displayChart(data){
    let context = document.querySelector('#hourly-chart').getContext('2d');
    var hour = [];
    var temp = [];

    for(var i = 0; i < 11; i++){
        temp.push(Math.round(`${data.hourly[i].temp}`));
    }

    var time = [
        '1AM', '2AM', '3AM', '4AM', '5AM', '6AM', '7AM', '8AM', '9AM', '10AM', '11AM', '12AM',
        '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM', '10PM', '11PM', '12PM'
    ]

    let mnt = moment().tz(`${data.timezone}`).format('H') - 1;
    
    for(var j = 1; j < 11; j++){
       hour.push(time[(mnt + j) % 24]);
    }

    var chart;

    chart = new Chart(context, {
        type: 'line',
        data: {
            labels: [hour[0], hour[1], hour[2], hour[3], hour[4], hour[5], hour[6], hour[7], hour[8], hour[9]],
            datasets: [{
                label: 'Hourly Temperature',
                backgroundColor: 'rgb(255, 99, 132, 0.2)',
                borderColor: 'rgb(255, 99, 132)',
                fill: true,
                opacity: 50,
                data: [temp[0], temp[1], temp[2], temp[3], temp[4], temp[5], temp[6], temp[7], temp[8], temp[9],]
            }]
        },
        options: {
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        max: 50,
                        fontSize: 11,
                        beginAtZero: true 
                    }
                }],
                xAxes: [{
                    ticks: {
                        fontSize: 11,
                    }
                }]
            }
        }
    })
}

function displayMap(layer){
    weatherMap.off();
    
    var map = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.openweathermap.org/">OpenWeatherMap</a>'
    }).addTo(weatherMap);
    
    var owm = L.tileLayer(`https://tile.openweathermap.org/map/${layer}/{z}/{x}/{y}.png?appid=e1558fe0d8dcc08923d8122663466af2`).addTo(weatherMap);
}