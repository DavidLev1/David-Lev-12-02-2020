import {getAllFavorites} from "./utils/storage-state.js";
import { getWeather } from "./endpoints.js";
import { removeChildren } from "./utils/logical-aid.js";
import { getFormattedDate, getDayOfTheWeek } from "./utils/visual-design.js";


const getFavoritesMsg = favoritesArr => {
    const favoritesWrapper = document.getElementById("favorites-wrapper");

    if(favoritesArr.length === 0) {
        const messegeElem = document.createElement("p");
        messegeElem.className = "favorites-msg";
        messegeElem.innerText = "No favorite cities has been added yet";
        favoritesWrapper.appendChild(messegeElem);
    } 
}

const setFavoritesWeather = () => {
    const favorites = getAllFavorites();

    const favoritesWrapper = document.getElementById("favorites-wrapper");
    removeChildren(favoritesWrapper);

    getFavoritesMsg(favorites);

    favorites.forEach( favoriteCity => {
        const favoriteCityKey = favoriteCity.cityKey;
        const favoriteCityName = favoriteCity.cityName;
        
        getWeather(favoriteCityKey)
            .then( localWeatherData => {
                const observationDateTime = new Date(localWeatherData[0].LocalObservationDateTime);
                const observationDate = getFormattedDate(observationDateTime);

                let favoriteCityWeather = {
                    cityName: favoriteCityName,
                    dayOfTheWeek: getDayOfTheWeek(observationDateTime),
                    currentDate: observationDate,
                    tempC: localWeatherData[0].Temperature.Metric.Value + "°C",
                    weatherDescription: localWeatherData[0].WeatherText
                }

                const favoriteCityWrapper = document.createElement("div");
                favoriteCityWrapper.className = "favorite-city-wrapper";

                let cityNameElem = document.createElement("p");
                cityNameElem.className = "city-name-elem";
                cityNameElem.innerText = favoriteCityWeather.cityName;

                let dayOfTheWeekElem = document.createElement("p");
                dayOfTheWeekElem.className = "favorite-week-day"
                dayOfTheWeekElem.innerText = favoriteCityWeather.dayOfTheWeek;

                let weatherDateElem = document.createElement("p");
                weatherDateElem.className = "weather-date-elem";
                weatherDateElem.innerText = favoriteCityWeather.currentDate;

                let weatherDegreeElem = document.createElement("p");
                weatherDegreeElem.className = "weather-degree-elem";
                weatherDegreeElem.innerText = favoriteCityWeather.tempC;

                let weatherDescriptionElem = document.createElement("p");
                weatherDescriptionElem.className = "weather-description-elem";
                weatherDescriptionElem.innerText = favoriteCityWeather.weatherDescription;

                const showWeatherBtn = document.createElement("button");
                showWeatherBtn.className = "show-weather-btn";
                showWeatherBtn.innerText = "Show Weather";

                showWeatherBtn.addEventListener("click", () => {
                    showWeather(favoriteCityKey, favoriteCityName)
                })

                favoriteCityWrapper.appendChild(cityNameElem);
                favoriteCityWrapper.appendChild(dayOfTheWeekElem);
                favoriteCityWrapper.appendChild(weatherDateElem);
                favoriteCityWrapper.appendChild(weatherDegreeElem);
                favoriteCityWrapper.appendChild(weatherDescriptionElem);
                favoriteCityWrapper.appendChild(showWeatherBtn);

                favoritesWrapper.appendChild(favoriteCityWrapper);
            })
    })
}
setFavoritesWeather();
 

const showWeather = (favoriteCityKey, favoriteCityName) => {
    window.location.href = "index.html?cityKey="+favoriteCityKey+"&cityName="+favoriteCityName;
}


const removeFavorites = () => {
    localStorage.clear();
    setFavoritesWeather();
}

const removeFavoritesBtn = document.getElementById("remove-favorites-btn");
removeFavoritesBtn.addEventListener("click", removeFavorites);
