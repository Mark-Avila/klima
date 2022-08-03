const $ = require('jquery')

// Get value of search input on each user keypress
$('searchInput').keypress(setQuery);

function setQuery(evt) {
    const searchInput = $('.search').val();

    if (evt.keyCode == 13) {
        //fetchLocation(search)
        console.log(searchInput);
    }
}