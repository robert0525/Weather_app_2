let appId = `09254cf01cbda27bc76c59c133a8e965`;
let units = `imperial`;
let searchMethood ;

function getSearchMethood(searchTerm) {
    if(searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
        searchMethood = 'zip';
    else    
        searchMethood = 'q';
}


function searchWeather(searchTerm) {
    getSearchMethood(searchTerm);
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethood}=${searchTerm}&APPID=${appId}&units=${units}`).then(result => {
        return result.json();
    }).then(result => {
        init(result);
    })
}
function init(resultFromServer) {
    switch (resultFromServer.weather[0].main){
        case 'Clear':
            document.body.style.backgroundImage = 'url("img/clear.jpg")';
            break;

        case 'Clouds':
            document.body.style.backgroundImage = 'url("img/clear.jpg")';
                break;
            

        case 'Rain':
        case 'Drizzle' :
        case 'Mist':
            document.body.style.backgroundImage = 'url("img/rain.jpg")';
            break;

        case 'Thunderstorm':
            document.body.style.backgroundImage = 'url("img/thunderstorm.jpg")';
            break;
        
        case 'Snow':
            document.body.style.backgroundImage = 'url("img/snow.jpg")';
            break;

        default:
            break;
    }
    

    let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
    let temperatureElement = document.getElementById('temperature');
    let humidityElement = document.getElementById('humidity');
    let windSpeedElement = document.getElementById('windSpeed');
    let cityHeader = document.getElementById('cityHeader');
    let weatherIcon = document.getElementById('documentIconImg');

    weatherIcon.src = ' http://openweathermap.org/img/wn/' + resultFromServer.weather[0].icon + '.png';

   let resultDescription = resultFromServer.weather[0].description;
   weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);

   temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176' ;
   windSpeedElement.innerHTML = 'Winds at ' + Math.floor(resultFromServer.wind.speed) + 'm/s';
   cityHeader.innerHTML = resultFromServer.name;
   humidityElement.innerHTML = 'Humidity level at ' + resultFromServer.main.humidity + '%';

   setPositionForWeatherInfo();

}

function setPositionForWeatherInfo() {
    let weatherContainer = document.getElementById('weatherContainer');
    let weatherContainerHeight = weatherContainer.clientHeight;
    let weatherContainerWidth = weatherContainer.clientWidth;

    weatherContainer.style.left = `calc(50% - ${weatherContainerWidth/2}px)`;
    weatherContainer.style.top = `calc(50% - ${weatherContainerHeight/1.3}px)`;
    weatherContainer.style.visibility = `visible`;




}

document.getElementById('searchBtn').addEventListener('click',() => {
    let searchTerm = document.getElementById('searchInput').value;
    if(searchTerm) 
        searchWeather(searchTerm);
})