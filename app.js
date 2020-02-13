import { getWeather, get5DaysForecast, getCityAutocomplete } from "./endpoints.js";
import { removeChildren, isValidUserInput, toggleDegrees } from "./utils/logical-aid.js";
import { getFormattedDate, getDayOfTheWeek } from "./utils/visual-design.js";
import { isCityInFavorites, onFavorite} from './utils/storage-state.js';

let currentCityKey = '215854';
let currentCityName = 'Tel Aviv';


const setLocationAutoComplete = e => {
  let userInput = e.target.value;
  const errorElem = document.getElementById("error-elem");
  let locations = [];
  const autocompletesWrapper = document.getElementById("autocompletes-wrapper");

  if (!isValidUserInput(userInput)) {
    locations = [];
    removeChildren(autocompletesWrapper);
    return;
  }

  errorElem.innerText = "";

  getCityAutocomplete(userInput)
    .then(autoCompleteResults => {
      locations = autoCompleteResults.map(location => {
        return {
          cityName: location.LocalizedName,
          cityKey: location.Key,
          countryName: location.Country.LocalizedName
        };
      });

      for (let i = 0; i < locations.length; i++) {
        let autocompleteElem = document.createElement("button");
        autocompleteElem.className = "autocomplete";
        autocompleteElem.innerText = `${locations[i].cityName}, ${locations[i].countryName}`;
        autocompleteElem.addEventListener("click", () => {
          currentCityKey = locations[i].cityKey;
          currentCityName =  locations[i].cityName;
          setWeatherData(currentCityKey, currentCityName),
          removeChildren(autocompletesWrapper),
          e.target.value = ""
        });

        autocompletesWrapper.appendChild(autocompleteElem);
      }
    })
    .catch(err => {
      console.log(err);
    });
};

document
  .getElementById("user-input-elem")
  .addEventListener("input", setLocationAutoComplete);


const setWeatherData = (cityKey, cityName) => {
  currentCityName = cityName;
  currentCityKey = cityKey;
  setCurrentDayWeather(cityKey, cityName);
  set5DaysForecast(cityKey);
};


const setCurrentDayWeather = (cityKey, cityName) => {
  const currentDayWeatherWrapper = document.getElementById(
    "current-day-weather-wrapper"
  );
  removeChildren(currentDayWeatherWrapper);

  getWeather(cityKey)
    .then(localWeatherData => {
      const observationDateTime = new Date(localWeatherData[0].LocalObservationDateTime);
      const observationDate = getFormattedDate(observationDateTime);

      let currentDayWeatherData = {
        cityName,
        dayOfTheWeek: getDayOfTheWeek(observationDateTime),
        currentDate: observationDate,
        tempC: localWeatherData[0].Temperature.Metric.Value + "°C",
        tempF: localWeatherData[0].Temperature.Imperial.Value + "°F",
        weatherDescription: localWeatherData[0].WeatherText
      };

      let weatherCityNameElem = document.getElementById("chosen-city-name");
      weatherCityNameElem.innerText = currentDayWeatherData.cityName;

      let toggleFavoritesElem = document.getElementById("favorites-btn");

      const cityInFavoritesText = cityKey => {
        if (isCityInFavorites(cityKey)) {
          toggleFavoritesElem.innerText = "Remove from favorites";
        } else {
          toggleFavoritesElem.innerText = "Add to favorites";
        }
      };

      cityInFavoritesText(cityKey);
      
      toggleFavoritesElem.addEventListener("click", (e) => {
        e.stopImmediatePropagation();
        cityKey = currentCityKey;
        cityName = currentCityName;
        onFavorite({cityKey, cityName});

        cityInFavoritesText(currentCityKey);
      });
      

      let dayOfTheWeekElem = document.createElement("p");
      dayOfTheWeekElem.className = "week-day"
      dayOfTheWeekElem.innerText = currentDayWeatherData.dayOfTheWeek;

      let weatherDateElem = document.createElement("p");
      weatherDateElem.className = "weather-date";
      weatherDateElem.innerText = currentDayWeatherData.currentDate;

      let weatherDegreeElem = document.createElement("p");
      weatherDegreeElem.className = "weather-degree";
      weatherDegreeElem.innerText = currentDayWeatherData.tempC;

      let toggleDegreesElem = document.createElement("button");
      toggleDegreesElem.className = "degree-btn";
      toggleDegreesElem.innerText = "Show °F";

      toggleDegreesElem.addEventListener("click", () => toggleDegrees(event, weatherDegreeElem, currentDayWeatherData));

      let weatherDescriptionElem = document.createElement("p");
      weatherDescriptionElem.className = "weather-description";
      weatherDescriptionElem.innerText = currentDayWeatherData.weatherDescription;

      currentDayWeatherWrapper.appendChild(dayOfTheWeekElem);
      currentDayWeatherWrapper.appendChild(weatherDateElem);
      currentDayWeatherWrapper.appendChild(weatherDegreeElem);
      currentDayWeatherWrapper.appendChild(toggleDegreesElem);
      currentDayWeatherWrapper.appendChild(weatherDescriptionElem);
    })
    .catch(err => console.log(err));
};


const set5DaysForecast = cityKey => {
  let forecastData = [];
  const forecastInfoElem = document.getElementById("forecast-info");
  removeChildren(forecastInfoElem);

  get5DaysForecast(cityKey)
    .then( fiveDaysForecastData => {
        const fiveDaysForecast = fiveDaysForecastData.DailyForecasts;

        forecastData = fiveDaysForecast.map(dailyForecast => {
          return {
            dayOfTheWeek: getDayOfTheWeek(dailyForecast.Date),
            currentDate: getFormattedDate(dailyForecast.Date),
            minTemp: dailyForecast.Temperature.Minimum.Value,
            maxTemp: dailyForecast.Temperature.Maximum.Value,
            dayForecast: dailyForecast.Day.IconPhrase,
            nightForecast: dailyForecast.Night.IconPhrase
          }
        });

        forecastData.map(dailyForecast => {
          let dailyForecastWrapperElem = document.createElement("div");
          dailyForecastWrapperElem.classList = "daily-forecast-container daily-forecast-info"

          let dayOfWeekElem = document.createElement("p");
          dayOfWeekElem.className = "week-day-forecast";
          dayOfWeekElem.innerText = dailyForecast.dayOfTheWeek;

          let currentDateElem = document.createElement("p");
          currentDateElem.innerText = dailyForecast.currentDate;

          let temperatureElem = document.createElement("p");
          temperatureElem.innerText = dailyForecast.minTemp + " - " + dailyForecast.maxTemp + " °C";

          let dayForecastElem = document.createElement("p");
          dayForecastElem.innerHTML = '<strong style="color: #69EAFF">Day: </strong>' + dailyForecast.dayForecast;

          let nightForecastElem = document.createElement("p");
          nightForecastElem.innerHTML = '<strong style="color: #DD96FF">Night: </strong>' + dailyForecast.nightForecast;

          dailyForecastWrapperElem.appendChild(dayOfWeekElem);
          dailyForecastWrapperElem.appendChild(currentDateElem);
          dailyForecastWrapperElem.appendChild(temperatureElem);
          dailyForecastWrapperElem.appendChild(dayForecastElem);
          dailyForecastWrapperElem.appendChild(nightForecastElem);

          forecastInfoElem.appendChild(dailyForecastWrapperElem);
        }) 
    })
    .catch(err => {
      console.log(err);
    });
}

const init = () => {
  const urlParams = new URLSearchParams(window.location.search);
  if(urlParams.get('cityKey') && urlParams.get('cityName')){
    setWeatherData(urlParams.get('cityKey'), urlParams.get('cityName'));
  } else {
    setWeatherData('215854', 'Tel Aviv');
  }
}

init();