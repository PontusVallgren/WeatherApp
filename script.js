// DOM
const container = document.querySelector(".container");
const cityName = document.querySelector("#city-name");
const currentWeather = document.querySelector("#current-weather");
const temp = document.querySelector("#temperature");
const weaterIcon = document.querySelector("#weather-icon");
const form = document.querySelector(".form-container");
const searchInput = document.querySelector("#search");

// Functions

const weatherr = (() => {
  function filterData(data) {
    let cityName = data.name;
    let temperature = data.main.temp;
    let weatherDes = data.weather[0].description;
    let weatherId = data.weather[0].icon;
    return { cityName, temperature, weatherDes, weatherId };
  }
  async function getData(search) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=6699fb51a03bca16f6f7545ce92da6a7`,
        { mode: "cors" }
      );
      const data = filterData(await response.json());
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  return { getData };
})();

const gatherWeaterDataDefault = async () => {
  try {
    const response = await fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=stockholm&units=metric&appid=6699fb51a03bca16f6f7545ce92da6a7",
      { mode: "cors" }
    );
    const weatherData = await response.json();
    console.log(weatherData);
    cityName.textContent = weatherData.name;
    currentWeather.textContent = weatherData.weather[0].description;
    temp.textContent = `${weatherData.main.temp} ℃`;
    weaterIcon.src = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
  } catch (error) {
    console.log(error);
  }
};
async function displayWeather() {
  try {
    const data = await weatherr.getData(searchInput.value);
    cityName.textContent = data.cityName;
    currentWeather.textContent = data.weatherDes;
    temp.textContent = `${data.temperature} ℃`;
    weaterIcon.src = `http://openweathermap.org/img/wn/${data.weatherId}@2x.png`;
  } catch (error) {
    console.log(error);
  }
}

// Events

gatherWeaterDataDefault();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  displayWeather();
});
