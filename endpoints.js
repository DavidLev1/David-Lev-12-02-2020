const API_KEY = "ZAjUotmYve0heefQOk2nrMiNSdQRtvVB";

// Weather info in specific location
// Must contain key of that location after WEATHER_URL_ROOT,
// for example: key of Tel Aviv is 215854
const WEATHER_URL_ROOT = "https://dataservice.accuweather.com/currentconditions/v1/";
const WEATHER_URL_PARAMS = `?apikey=${API_KEY}&language=en-us&details=false`;
const getWeatherUrl = locationKey =>
  WEATHER_URL_ROOT + locationKey + WEATHER_URL_PARAMS;

export const getWeather = async cityKey => {
  const apiUrl = await fetch(getWeatherUrl(cityKey));
  const data = await apiUrl.json();
  return data;
};

// Forecast for 5 days in specific location
// Must contain key of that location after FORECAST_5_DAYS_URL_ROOT,
// for example: key of Tel Aviv is 215854
const FORECAST_5_DAYS_URL_ROOT = "https://dataservice.accuweather.com/forecasts/v1/daily/5day/";
const FORECAST_5_DAYS_URL_PARAMS = `?apikey=${API_KEY}&details=false&metric=true`;
const get5DaysForecastUrl = locationKey =>
  FORECAST_5_DAYS_URL_ROOT + locationKey + FORECAST_5_DAYS_URL_PARAMS;

export const get5DaysForecast = async someCityKey => {
  const apiUrl = await fetch(get5DaysForecastUrl(someCityKey));
  const data = await apiUrl.json();
  return data;
};

const LOCATION_AUTO_COMPLETE_ROOT_URL =
  "https://dataservice.accuweather.com/locations/v1/cities/autocomplete";
const LOCATION_AUTO_COMPLETE_PARAMS_URL = `?apikey=${API_KEY}&language=en-us`;
const getCityAutocompleteUrl = inputVal =>
  LOCATION_AUTO_COMPLETE_ROOT_URL +
  LOCATION_AUTO_COMPLETE_PARAMS_URL +
  "&q=" +
  inputVal;

export const getCityAutocomplete = async inputValue => {
  const apiUrl = await fetch(getCityAutocompleteUrl(inputValue));
  const data = await apiUrl.json();
  return data;
};
