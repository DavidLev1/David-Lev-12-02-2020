class WeatherStore {
  displayedCityName = "";
  locationSuggestions = [];
  error = "";

  selectedLocation = {
    cityName: "Tel Aviv",
    key: "215854",
    countryName: "Israel"
  };

  isNewCitySelected = false;

  currentDateWeather = {};
  fiveDaysForecast = [];

  favorites = [];
  isInFavorites = false;

  setCurrentDateWeather(weatherItem) {
    this.currentDateWeather = weatherItem;
    this.displayedCityName = this.selectedLocation.cityName;
    const favoriteItemIndex = this.favorites.findIndex(
      item => item.cityKey === this.selectedLocation.key
    );
    this.isInFavorites = favoriteItemIndex > -1 ? true : false;
    this.isNewCitySelected = false;
  }

  setFiveDaysForecast(fiveDaysWeatherItem) {
    this.fiveDaysForecast = fiveDaysWeatherItem;
  }

  setSelectedLocation(locationItem) {
    this.selectedLocation = locationItem;
    this.locationSuggestions = [];
    this.isNewCitySelected = true;
  }

  resetToNewCity() {
    this.isNewCitySelected = false;
    this.locationSuggestions = [];
    this.displayedCityName = "";
  }

  setLocationSuggestions(locations) {
    this.locationSuggestions = locations;
  }

  onFavoriteChoice() {
    if (this.isInFavorites) this.removeFavoriteLocation();
    else this.addFavoriteLocation();
  }

  addFavoriteLocation() {
    const favoriteItem = {
      cityKey: this.selectedLocation.key,
      cityName: this.selectedLocation.cityName,
      cityWeather: this.currentDateWeather
    };
    this.favorites.push(favoriteItem);
    this.isInFavorites = true;
  }

  removeFavoriteLocation() {
    this.favorites = this.favorites.filter(
      item => item.cityKey !== this.selectedLocation.key
    );
    this.isInFavorites = false;
  }
}

export const weatherStore = new WeatherStore();
