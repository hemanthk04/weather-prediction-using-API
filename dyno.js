"use strict";
const API = "efac64faf1855fd3ec7de0e8aa18d93f";
const day = document.querySelector(".day");
const date = document.querySelector(".date");

const inputquery = document.querySelector(".citylocation");
const button = document.querySelector(".searchbutton");

const currweather = document.querySelector(".icons");
const currdayinfo = document.querySelector(".currdayinfo");
const nextlist = document.querySelector(".nextlist ul");

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const nowday = new Date();
const dayName = days[nowday.getDay()];
day.textContent = dayName;

let month = nowday.toLocaleString("default", { month: "long" });
let nowdate = nowday.getDate();
let year = nowday.getFullYear();

console.log();
date.textContent = nowdate + " " + month + " " + year;

button.addEventListener("click", (e) => {
  e.preventDefault();
  // checking if empty value
  if (inputquery.value !== "") {
    const Search = inputquery.value;
    inputquery.value = "";
    findLocationinfo(Search);
  } else {
    console.log("Please Enter correct location");
  }
});

async function findLocationinfo(namesearch) {
  currweather.innerHTML = "";
  currdayinfo.innerHTML = "";
  nextlist.innerHTML = "";

  try {
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${namesearch}&appid=${API}`;
    const data = await fetch(API_URL);
    const result = await data.json();
    console.log(result);
    if (result.cod !== "404") {
      const ImageContent = displayImageContent(result);
      const rightSide = rightSideContent(result);
      displayForeCast(result.coord.lat, result.coord.lon);
      changeBackground(result);

      setTimeout(() => {
        currweather.insertAdjacentHTML("afterbegin", ImageContent);
        currweather.classList.add("fadeIn");
        currdayinfo.insertAdjacentHTML("afterbegin", rightSide);
      }, 1000);
    } else {
      const message = `<h2 class="weather_temp">${result.cod}</h2>
      <h3 class="cloudtxt">${result.message}</h3>`;
      currweather.insertAdjacentHTML("afterbegin", message);
    }
  } catch (error) {}
}

function displayImageContent(data) {
  //   displaycardbackground(data);
  return `<h2 class="tempnow">${Math.round(data.main.temp - 273.15)}°C</h2>
    <h3 class="scenenow">${data.weather[0].description}</h3>`;
}

function rightSideContent(result) {
  return `<div class="daycontent">
          <p class="title">Location</p>
          <span class="value">${result.name}</span>
        </div>
        <div class="daycontent">
          <p class="title">Max. Temp</p>
          <span class="value">${Math.round(
            result.main.temp_max - 275.15
          )}°C</span>
        </div>
        <div class="daycontent">
          <p class="title">Min. Temp</p>
          <span class="value">${Math.round(
            result.main.temp_min - 275.15
          )}°C</span>
        </div>
        <div class="daycontent">
          <p class="title">Humidity</p>
          <span class="value">${result.main.humidity}%</span>
        </div>
        <div class="daycontent">
          <p class="title">Windspeed</p>
          <span class="value">${result.wind.speed} Km/h</span>
        </div>
        <div class="daycontent">
          <p class="title">Sunrise Time</p>
          <span class="value">${result.wind.speed} Km/h</span>
        </div>
        <div class="daycontent">
          <p class="title">Sunset Time</p>
          <span class="value">${result.wind.speed}°C</span>
        </div>`;
}

async function displayForeCast(lat, long) {
  const ForeCast_API = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${API}`;
  const data = await fetch(ForeCast_API);
  const result = await data.json();

  const uniqeForeCastDays = [];
  const daysForecast = result.list.filter((forecast) => {
    const forecastDate = new Date(forecast.dt_txt).getDate();
    if (!uniqeForeCastDays.includes(forecastDate)) {
      return uniqeForeCastDays.push(forecastDate);
    }
  });
  console.log(daysForecast);
  daysForecast.forEach((content, indx) => {
    if (indx <= 3) {
      nextlist.insertAdjacentHTML("afterbegin", forecast(content));
    }
  });
}

function forecast(frContent) {
  const day = new Date(frContent.dt_txt);
  const dayName = days[day.getDay()];
  const splitDay = dayName.split("", 3);
  const joinDay = splitDay.join("");

  // console.log(dayName);

  return `<li>
  <img src="https://openweathermap.org/img/wn/${
    frContent.weather[0].icon
  }@2x.png" />
  <span>${joinDay}</span>
  <span class="day_temp">${Math.round(frContent.main.temp - 275.15)}°C</span>
</li>`;
}

//Function to change the backgroup acc to time.
//Morning was set as 5am to 5pm
//Evening was set as 5pm to 5am

//will change it based on the sunrise and sunset time.

function changeBackgroundBasedOnTime() {
  // Get the current time in IST
  const now = new Date();
  const ISTOffset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds
  const ISTTime = new Date(now.getTime() + ISTOffset);

  // Get hours in 24-hour format
  const hours = ISTTime.getUTCHours();

  // Determine the time of day and set the background color
  if (hours >= 5 && hours < 17) {
    document.body.style.backgroundImage = "url('./stock/morning.jpg')";
  } else if ((hours >= 17 && hours < 24) || hours < 5) {
    document.body.style.backgroundImage = "url('./stock/night.jpg')";
  }
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundPosition = "center";
}

// Call the function to set the initial background
changeBackgroundBasedOnTime();

// Optionally, update the background periodically (e.g., every minute)
setInterval(changeBackgroundBasedOnTime, 60 * 1000);

function changeBackground(result) {
  const weatherCondition = result.weather[0].main;
  const currSectionEl = document.querySelector(".currsection");
  currSectionEl.style.backgroundImage = `url('./stock/${weatherCondition}.jpg')`;
  currSectionEl.style.backgroundSize = "cover";
  currSectionEl.style.backgroundPosition = "center";
}
