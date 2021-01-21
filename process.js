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

function viewResults(data) {
    console.log(data);
    let city = document.querySelector('.city');
    let country = document.querySelector('.country');
    city.innerText = data.name;
    country.innerText = data.sys.country;
}