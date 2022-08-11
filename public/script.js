let map = L.map('weathermap-leaflet').setView([14.60, 121], 10);

function initMap() {
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
}

function initChart() {
    const ctx = document.getElementById('hourforecast-graph').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: 'white',
                borderColor: 'white',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    })
}

function openModal(text) {
    $('.darkbg').removeClass('darkbg--close');
    $('.modal').removeClass('modal--close');
}

function closeModal() {
    $('.darkbg').addClass('darkbg--close');
    $('.modal').addClass('modal--close');
}

function openInfo() {
    $('.info').addClass('info--open');
    $('main').addClass('main--close');
    
    setTimeout(() => {
        map.invalidateSize();
    }, 500)

}

function closeInfo() {
    $('.info').removeClass('info--open');
    $('main').removeClass('main--close');

    updateBackground('snow');
    tsParticles
    .loadJSON("tsparticles", "particles/snow.json")
    .then((container) => {
        console.log("callback - tsparticles config loaded");
    })
    .catch((error) => {
        console.error(error);
    });
}

function backgroundCloudy() {
    $('.frontmountain').addClass('frontmountain--cloudy')
    $('.backmountain').addClass('backmountain--cloudy')
    $('.backtrees').addClass('backtrees--cloudy')
    $('.fronttrees').addClass('fronttrees--cloudy')
    $('.skytop').addClass('skytop--cloudy')
    $('.skybottom').addClass('skybottom--cloudy')
    $('.cloud').addClass('cloud--disable')
}

function backgroundSnow() {
    $('.frontmountain').addClass('frontmountain--snow')
    $('.backmountain').addClass('backmountain--snow')
    $('.backtrees').addClass('backtrees--snow')
    $('.fronttrees').addClass('fronttrees--snow')
    $('.skytop').addClass('skytop--snow')
    $('.skybottom').addClass('skybottom--snow')
    $('.cloud').addClass('cloud--disable')
    $('.laketop').addClass('laketop--snow')
    $('.lakebottom').addClass('lakebottom--snow')
    $('footer').addClass('footer--snow')
    $('.footer__link').addClass('footer--snow')
}

function backgroundClear() {
    $('.frontmountain').removeClass('frontmountain--snow').removeClass('frontmountain--cloudy')
    $('.backmountain').removeClass('backmountain--snow').removeClass('backmountain--cloudy')
    $('.backtrees').removeClass('backtrees--snow').removeClass('backtrees--cloudy')
    $('.fronttrees').removeClass('fronttrees--snow').removeClass('fronttrees--cloudy')
    $('.skytop').removeClass('skytop--snow').removeClass('skytop--cloudy')
    $('.skybottom').removeClass('skybottom--snow').removeClass('skybottom--cloudy')
    $('.cloud').removeClass('cloud--disable').removeClass('cloud--disable')
    $('.laketop').removeClass('laketop--snow').removeClass('laketop--cloudy')
    $('.lakebottom').removeClass('lakebottom--snow').removeClass('lakebottom--cloudy')
    $('footer').removeClass('footer--snow').removeClass('footer--cloudy')
    $('.footer__link').removeClass('footer--snow').removeClass('footer--cloudy')
}
 
function updateBackground(weather) {
    if (weather === 'clear') {
        backgroundClear();
    }

    if (weather === 'cloudy') {
       backgroundCloudy();
    }

    if (weather === 'snow') {
       backgroundSnow();
    }
}

function loadParticles(weather) {

    tsParticles.loadJSON("tsparticles", "particles/rain.json")
    .then((container) => {
        console.log("callback - tsparticles config loaded");
    })
    .catch((error) => {
        console.error(error);
    });
}

function debounce(func, wait, immediate) {
    let timeout;

    return function () {
        const context = this, args = arguments
        const later = function() {
            timeout = null
            if (!immediate) {
                func.apply(context, args)
            }
        }

        const callNow = immediate && !timeout;
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
        if (callNow) {
            func.apply(context, args);
        }
    }
}

/**
 * Fetch locations based on search
 * @param {string} query Search query 
 * @returns Array of objects (empty if none found)
 */
async function getLocations(query) {
    const response = await fetch(`/api/search/${query}`);
    const data = await response.json();
    
    return data
}

function searchQuery(event) {

    if (event.key == "Enter") {
        const query = $('input[name=search]').val();
        getCurrentWeather(query)
        console.log('test')
    }
}

$('input[name=search]').keyup(debounce(() => {
    getLocations($('input[name=search]').val()).then((data) => console.log(data))
}, 500))

initMap();
initChart();
