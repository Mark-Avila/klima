function fectchWeather() {
    fetch("http://api.openweathermap.org/data/2.5/weather?q=Manila&appid=e1558fe0d8dcc08923d8122663466af2")
        .then(res => {
            if(!res.ok){
                console.log("Response Failed");
            }
            return res.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.log("ERROR");
        });
}

fectchWeather();