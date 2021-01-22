const api = {
    key: 'e1558fe0d8dcc08923d8122663466af2',
    link: 'http://api.openweathermap.org/data/2.5/'
}

const searchInput = document.querySelector('.search');

searchInput.addEventListener('keypress', setQuery);

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

function buildDate(date) {
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    let Day = days[date.getDay()];
    let currentDate = date.getDate();
    let month = months[date.getMonth()];
    let year = date.getFullYear();

    return `${Day} ${currentDate} ${month} ${year}`;
}

function viewResults(data) {
    console.log(data);
    let city = document.querySelector('.city');
    let currentDate = new Date(); //gets current date
    let date = document.querySelector('.date');

    city.innerText = data.name +", "+data.sys.country;
    date.innerText = buildDate(currentDate);

    let mainTemp = document.querySelector('.temp');
    mainTemp.innerText = `${Math.round(data.main.temp)}°`;

    let mainWeather = document.querySelector('.weather');
    mainWeather.innerText = data.weather[0].main;

    let mainIcon = document.querySelector('.icon');
    mainIcon.innerHTML = getWeatherIcon(data.weather[0].id);
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