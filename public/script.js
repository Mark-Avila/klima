let suggestions = [];
let weather = {};
let chart;
let map = L.map("weathermap-leaflet").setView([14.6, 121], 10);

function initMap() {
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap",
  }).addTo(map);

  L.tileLayer('https://tile.openweathermap.org/map/{layer}/{z}/{x}/{y}.png?appid={API key}').addTo(map);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

}

function openModal(text) {
  $(".darkbg").removeClass("darkbg--close");
  $(".modal").removeClass("modal--close");
}

function closeModal() {
  $(".darkbg").addClass("darkbg--close");
  $(".modal").addClass("modal--close");
}

function openInfo() {
  $(".info").addClass("info--open");
  $("main").addClass("main--close");
  $("footer").addClass("footer--close");

  setTimeout(() => {
    map.invalidateSize();
  }, 500);
}

function closeInfo() {
  $(".info").removeClass("info--open");
  $("main").removeClass("main--close");
  $("footer").removeClass("footer--close");
}

function backgroundCloudy() {
  $(".frontmountain").addClass("frontmountain--cloudy");
  $(".backmountain").addClass("backmountain--cloudy");
  $(".backtrees").addClass("backtrees--cloudy");
  $(".fronttrees").addClass("fronttrees--cloudy");
  $(".skytop").addClass("skytop--cloudy");
  $(".skybottom").addClass("skybottom--cloudy");
  $(".cloud").addClass("cloud--disable");
}

function backgroundSnow() {
  $(".frontmountain").addClass("frontmountain--snow");
  $(".backmountain").addClass("backmountain--snow");
  $(".backtrees").addClass("backtrees--snow");
  $(".fronttrees").addClass("fronttrees--snow");
  $(".skytop").addClass("skytop--snow");
  $(".skybottom").addClass("skybottom--snow");
  $(".cloud").addClass("cloud--disable");
  $(".laketop").addClass("laketop--snow");
  $(".lakebottom").addClass("lakebottom--snow");
  $("footer").addClass("footer--snow");
  $(".footer__link").addClass("footer--snow");
}

function backgroundClear() {
  $(".frontmountain")
    .removeClass("frontmountain--snow")
    .removeClass("frontmountain--cloudy");
  $(".backmountain")
    .removeClass("backmountain--snow")
    .removeClass("backmountain--cloudy");
  $(".backtrees")
    .removeClass("backtrees--snow")
    .removeClass("backtrees--cloudy");
  $(".fronttrees")
    .removeClass("fronttrees--snow")
    .removeClass("fronttrees--cloudy");
  $(".skytop").removeClass("skytop--snow").removeClass("skytop--cloudy");
  $(".skybottom")
    .removeClass("skybottom--snow")
    .removeClass("skybottom--cloudy");
  $(".cloud").removeClass("cloud--disable").removeClass("cloud--disable");
  $(".laketop").removeClass("laketop--snow").removeClass("laketop--cloudy");
  $(".lakebottom")
    .removeClass("lakebottom--snow")
    .removeClass("lakebottom--cloudy");
  $("footer").removeClass("footer--snow").removeClass("footer--cloudy");
  $(".footer__link").removeClass("footer--snow").removeClass("footer--cloudy");
}

function updateBackground(weather) {
  if (weather === "clear") {
    backgroundClear();
  }

  if (weather === "cloudy") {
    backgroundCloudy();
  }

  if (weather === "snow") {
    backgroundSnow();
  }
}

function loadParticles(weather) {
  tsParticles
    .loadJSON("tsparticles", "particles/rain.json")
    .then((container) => {
      console.log("callback - tsparticles config loaded");
    })
    .catch((error) => {
      console.error(error);
    });
}

function closeSuggestions() {
  $(".main__suggestions").addClass("main__suggestions--close");
}

function openSuggestions() {
  if (suggestions.length !== 0) {
    $(".main__suggestions").removeClass("main__suggestions--close");
  }
}

function startLoad() {
  $('main').addClass('main--close')
  $('.initialload').removeClass('initialload--close');
}

function endLoad() {
  $('.initialload').addClass('initialload--close');
  $('main').removeClass('main--close')
}

function getCurrentDate(offset) {
  let date = new Date();
  let localTime = date.getTime();
  let localOffset = date.getTimezoneOffset() * 60000;
  let utc = localTime + localOffset;
  let locationTIme = utc + (1000 * offset)
  let newDate = new Date(locationTIme)
  return newDate
}

function debounce(func, wait, immediate) {
  let timeout;

  return function () {
    const context = this,
      args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };

    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func.apply(context, args);
    }
  };
}

function handleSuggestions(data) {
  if (data.length === 0) {
    return closeSuggestions();
  }

  suggestions = data.map((item, index) => {
    return {
      id: index,
      country: item.country,
      name: item.name,
      lat: item.lat,
      lon: item.lon,
    };
  });

  $(".main__suggestions__list").empty();

  suggestions.forEach((item) => {
    $(".main__suggestions__list").append(
      `<li class='main__suggestions__item'><button onClick="handleSuggSelect(${item.id}, '${item.name}, ${item.country}')" class='main__suggestions__btn fluid'>${item.name}, ${item.country}</button></li>`
    );
  });

  openSuggestions();
}

async function getLocations(query) {
  const response = await fetch(`/api/search/${query}`);
  const data = await response.json();

  return data;
}

function searchQuery(event) {
  if (event.key == "Enter") {
    const query = $("input[name=search]").val();
    getCurrentWeather(query);
    console.log("test");
  }
}

async function getCurrentWeather(lat, lon) {
  const response = await fetch(`/api/current/${lat}/${lon}`);
  const data = await response.json();

  return data;
}

async function initData(lat, lon, loc) {
  try {
    let currentWeather = await getCurrentWeather(lat, lon);
    let currentForecast = await getForecastWeather(lat, lon);
    let currentLocation = loc ? loc : currentForecast.city.name + ', ' + currentForecast.city.country; 
    initMain(currentWeather, currentForecast, currentLocation);
  } catch(error) {
    console.error(error)
  }
}

async function handleSuggSelect(index, loc) {
  const lat = suggestions[index].lat;
  const lon = suggestions[index].lon;
  initData(lat, lon, loc).then(() => {
    closeSuggestions();
  });
}

async function getForecastWeather(lat, lon) {
  const response = await fetch(`/api/forecast/${lat}/${lon}`);
  const data = await response.json();
  return data;
}

function initMain(data, forecast, loc) {
  const mainWeather = $('.main__data__weather');
  const mainTemp = $('.main__data__temp');
  const mainCity = $('.main__data__city');

  mainWeather.text(data.weather[0].main);
  mainTemp.text(Math.floor(data.main.temp)+'°');
  mainCity.text(loc)

  const gTime = $('.general__text__time');
  const gLoc = $('.general__text__location');
  const gFeels = $('.general__text__feels');
  const gTemp = $('.general__upper__temp')
  
  gTime.text(`${getCurrentDate(data.timezone).toLocaleString()}`)
  gLoc.text(loc);
  gFeels.text(`Feels like ${Math.floor(data.main.feels_like)}°`);
  gTemp.text(Math.floor(data.main.temp) + '°');

  const wind = $('#general-speed');
  const pres = $('#general-pressure');
  const hum = $('#general-humidity');
  const vis = $('#general-visibility');

  wind.text(`${data.wind.speed} m/s`);
  pres.text(`${data.main.pressure} pHA`);
  hum.text(`${data.main.humidity} %`);
  vis.text(`${data.visibility / 1000} km`);

  const forecastDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]  

  $('.forecast__item__weather').each((i, obj) => {
    $(obj).text(forecast.list[i].weather[0].main);
  })

  $('.forecast__item__temp').each((i, obj) => {
    $(obj).text(Math.floor(forecast.list[i].main.temp) + ' °C');
  })

  let index = new Date().getDay()

  $('.forecast__item__day').each((i, obj) => {
    $(obj).text(forecastDay[index])
    index = index < 6 ? index + 1 : 0;
  })

  map.setView([data.coord.lat, data.coord.lon], 10);

  // label: "# of Votes",
  // data: [12, 19, 3, 5, 2, 3],
  // backgroundColor: "white",
  // borderColor: "white",
  // borderWidth: 1,
}

$("input[name=search]").keyup(
  debounce(() => {
    getLocations($("input[name=search]").val())
      .then(closeSuggestions())
      .then((data) => handleSuggestions(data))
      .catch((error) => {
        console.error(error);
      });
  }, 500)
);

$("");
startLoad();
initData(14.5995, 120.9842).then(() => {
  initMap();
  endLoad();
});
