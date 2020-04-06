let appId = `09254cf01cbda27bc76c59c133a8e965`;
let units = `imperial`;
let searchMethood = 'zip';

function getSearchMethood(searchTerm) {
    if(searchTerm.length === 5)
}


function searchWeather(searchTerm) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethood}=${searchTerm}&APPID=${appId}&units=${units}`).then(result => {
        return result.json();
    }).then(result => {
        init(result);
    })
}
function init(resultFromServer) {
    console.log(resultFromServer);
}

document.getElementById('searchBtn').addEventListener('click',() => {
    let searchTerm = document.getElementById('searchInput').value;
    if(searchTerm)
        searchWeather(searchTerm);
})