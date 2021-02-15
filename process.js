const searchInput = document.querySelector('.search');

searchInput.addEventListener('keypress', setQuery);

fetchData('Manila');

function setQuery(evt) {
    if(evt.keyCode == 13) {
        fetchData(searchInput.value);
    }
}

function fetchData(query) {
    fetch('http://api.openweathermap.org/data/2.5/weather?q='+query+'&units=metric&appid=e1558fe0d8dcc08923d8122663466af2')
    .then(response => {
        return response.json();
    })
    .then(viewResults);
}

function fetchForecastData(lat, lon){
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=metric&appid=e1558fe0d8dcc08923d8122663466af2`)
    .then(response => {
        return response.json();
    }).then(viewMoreResults);
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

function viewResults(data) {
    fetchForecastData(data.coord.lat, data.coord.lon); //sends longitude and latitude location to the forecast function

    element = {
        main: {
            city: document.querySelector('.city'),
            temp: document.querySelector('.temp'),
            weather: document.querySelector('.weather'),
            icon: document.querySelector('.icon')
        },
        gen: {
            feels: document.querySelector('#g-feels-like'),
            locate: document.querySelector("#g-location"),
            speed: document.querySelector("#wind-speed"),
            pres: document.querySelector("#pressure"),
            humid: document.querySelector("#humidity"),
            visib: document.querySelector("#visibility")
        }
    }

    const {city, temp, weather, icon} = element.main;
    const {feels, speed, pres, humid, visib, locate} = element.gen;

    //main
    city.innerText = data.name +", "+data.sys.country;  //Location
    temp.innerText = `${Math.round(data.main.temp)}°`;  //Location temperature
    weather.innerText = data.weather[0].main;           //location weather
    icon.innerHTML = getWeatherIcon(data.weather[0].id);//weather icon

    //general (box below)
    feels.innerText = `Feels like ${Math.round(data.main.feels_like)}°C`;
    locate.innerText = data.name +", "+data.sys.country; 
    speed.innerText = `${data.wind.speed} m/s`;
    pres.innerText = `${data.main.pressure} pHA`;
    humid.innerText = data.main.humidity + ' %';
    visib.innerText = Math.round(data.visibility / 1000) + ' km';
}

function getWeatherIcon(id){
    if(id >= 200 && id <= 232){ //thunder
        return '<i class="fas fa-bolt fa-2x"></i>';
    }
    else if(id >= 300 && id <= 321){ //drizzle
        return '<i class="fas fa-cloud-rain fa-2x"></i>';
    }
    else if(id >= 500 && id <= 531){ //rain
        return '<i class="fas fa-cloud-showers-heavy fa-2x"></i>';
    }
    else if(id >= 600 && id <= 622){ //drizzle
        return '<i class="far fa-snowflake fa-2x"></i>';
    }
    else if(id >= 700 && id <= 781){ //smog
        return '<i class="fas fa-smog fa-2x"></i>';
    }
    else if(id == 800){ //sunny/clear
        return '<i class="fas fa-sun fa-2x"></i>';
    }
    else if(id >= 801 && id <= 804){ //cloud
        return '<i class="fas fa-cloud fa-2x"></i>';
    }
    else {
        console.log("Error: weather id not found");
    }
}

function viewMoreResults(data)
{
    console.log(data);

    let week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    let city, day, icon, temp, time;
    let date = new Date();
    let gtemp = document.querySelector('#g-current-temp');

    for(var i = 0; i < 8; i++){
        city = document.querySelector(`#weather-${i+1}`);
        city.innerText = data.daily[i].weather[0].main;

        day = document.querySelector(`#day-${i+1}`);
        day.innerText = week[(date.getDay() + 1 + i) % 7];

        icon = document.querySelector(`#icon-${i+1}`);
        icon.innerHTML = getWeatherIcon(data.daily[i].weather[0].id);

        temp = document.querySelector(`#day-${i+1}-temp`);
        temp.innerText = `${Math.round(data.daily[i].temp.max)} / ${Math.round(data.daily[i].temp.min)}°C`;
    }

    gtemp.innerText = `${Math.round(data.current.temp)}°C`;

    let momentdate = document.querySelector('.date');
    momentdate.innerText = moment().tz(`${data.timezone}`).format('dddd, MMMM DD YYYY');

    time = document.querySelector("#g-time");
    time.innerText = moment().tz(`${data.timezone}`).format("YYYY/MM/DD HH:mm");
}
