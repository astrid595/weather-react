import React from "react";

export default function Weather() {
    return (
        function formatDate(timestamp) {
            let date = new Date(timestamp);
            let hours = date.getHours();
            if (hours < 10) {
              hours = `0${hours}`;
            }
            let minutes = date.getMinutes();
            if (minutes < 10) {
              minutes = `0${minutes}`;
            }
          
            let days = [
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ];
            let day = days[date.getDay()];
            return `${day}, ${hours}:${minutes}`;
          }
        
          function formatDay(timestamp){
            let date = new Date(timestamp * 1000);
            let day = date.getDay();
            let days = ["Sun", "Mon", "Tue","Wed","Thu","Fri","Sat"];
        
            return days[day];
          }
        
          function displayForecast (response) {
            let forecast = response.data.daily;
            let forecastElement = document.querySelector("#forecast");
        
            let forecastHTML = `<div class="row">`;
            forecast.forEach(function(forecastDay, index)
           {
             if (index <6) {
            forecastHTML =   
              forecastHTML +  
              `
              <div class="col-2">
                <div class="weather-forecast-date">
                    ${formatDay(forecastDay.dt)}
                </div>
                
                <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" 
                alt=""
                width="30"
                />
                <div class="weather-forecast-temperatures">
                    <span class="weather-forecast-temperature-max">
                        ${Math.round(forecastDay.temp.max)}°
                    </span>
                    <span class="weather-forecast-temperature-max">
                        ${Math.round(forecastDay.temp.min)}°
                    </span>
                </div>
                
              </div>
              `;
             }
           } )
            
           
        
            forecastHTML = forecastHTML + `</div>`;
            forecastElement.innerHTML = forecastHTML;
        
          }
        
          function getForecast(coordinates) {
            console.log(coordinates);
            let apiKey = "c8116d2b99630d13abef344e372457d3";
            let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
            axios.get(apiUrl).then(displayForecast);
          }
          
          function displayTemperature(response) {
            let temperatureElement = document.querySelector("#temperature");
            temperatureElement.innerHTML = Math.round(response.data.main.temp);
          
            let cityElement = document.querySelector("#city");
            cityElement.innerHTML = response.data.name;
          
            let conditionElement = document.querySelector("#condition");
            conditionElement.innerHTML = response.data.weather[0].description;
        
            let humidityElement = document.querySelector("#humidity");
            humidityElement.innerHTML = response.data.main.humidity;
        
            let windElement = document.querySelector("#wind");
            windElement.innerHTML = Math.round(response.data.wind.speed);
          
            let dateElement = document.querySelector("#date");
            dateElement.innerHTML = formatDate(response.data.dt * 1000);
          
            let iconElement = document.querySelector("#icon");
            iconElement.setAttribute(
              "src",
              `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
            );
            iconElement.setAttribute("alt", response.data.weather[0].description);
          
              getForecast(response.data.coord)
          
          }
          
          function search(city) {
            let apiKey = "c8116d2b99630d13abef344e372457d3";
            let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
            
            axios.get(apiUrl).then(displayTemperature);
          }
          
          function handleSubmit(event) {
            event.preventDefault();
            let cityInputElement = document.querySelector("#city-input").value;
            search(cityInputElement);
          }
          
          let form = document.querySelector("#search-form");
          form.addEventListener("submit", handleSubmit);
        
        
            function handleCurrent(position) {
              console.log(position.coords.latitude);
              console.log(position.coords.longitude);
            
              let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=6f7db97d4508405a35031f006368bb76&units=metric`;
              axios.get(apiUrl).then(displayTemperature);
              apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=6f7db97d4508405a35031f006368bb76&units=metric`;
            axios.get(apiUrl).then(displayForecast);
            }
            
            function currenttemp(event) {
              event.preventDefault();
              navigator.geolocation.getCurrentPosition(handleCurrent);
            }
            let currentbutton = document.querySelector("#current");
            currentbutton.addEventListener("click", currenttemp);
          
          search("London");
          
    )
}