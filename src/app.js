function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let weatherDescription = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  weatherDescription.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
}
let apiKey = "89c4b4c6c243370cb32a6437b3bb99bf";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Denver&appid=${apiKey}&units=imperial`;

axios.get(apiUrl).then(displayTemperature);
