//calculate time
function formatTime(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let day = days[date.getDay()];
  let month = months[date.getMonth()];
  let currentDate = date.getDate();
  return `${day}, ${month} ${currentDate}`;
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let weatherDescription = document.querySelector("#description");
  let todayDescription = document.querySelector("#todayDescription");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind-speed");
  // let highTempElement = document.querySelector("#todayHigh");
  // let lowTempElement = document.querySelector("#todayLow");
  let dateElement = document.querySelector("#date");
  let timeElement = document.querySelector("#time");
  let weatherIconElement = document.querySelector("#weatherIcon");

  fahrenheitTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  weatherDescription.innerHTML = response.data.weather[0].description;
  todayDescription.innerHTML = response.data.weather[0].main;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  // todayHumidity.innerHTML = response.data.main.humidity;
  //highTempElement.innerHTML = Math.round(response.data.main.temp_max);
  //lowTempElement.innerHTML = Math.round(response.data.main.temp_min);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  timeElement.innerHTML = formatTime(response.data.dt * 1000);
  weatherIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "89c4b4c6c243370cb32a6437b3bb99bf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayCelciusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let celciusTemperature = ((fahrenheitTemperature - 32) * 5) / 9;
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

search("Denver");

let fahrenheitTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let degreeC = document.querySelector("#degreeC");
degreeC.addEventListener("click", displayCelciusTemperature);

let fahrenheitLink = document.querySelector("#degreeF");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

displayForecast();
