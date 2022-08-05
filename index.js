function initMap() {
    let map = L.map('weathermap-leaflet').setView([14.60, 121], 9);

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
    $('.info').removeClass('info--close');
    $('main').addClass('main--close');
}

function closeInfo() {
    $('.info').addClass('info--close');
    $('main').removeClass('main--close');
}

if ($('main').hasClass('main-close')) {
    print("Opened")
}

initMap();
initChart();