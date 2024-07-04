const apikey = "610c7cd201dfee88ba00285db3117fa9";


const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");

document.querySelector(".error").style.display = "none";

async function checkweather(city) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${namesearch}&appid=${apikey}`);
  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    var data = await response.json();
    console.log(data);

    document.querySelector(".error").style.display = "none";
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temparature").innerHTML =
      Math.round(data.main.temp - 273.16) + "°c";
    document.querySelector(".humid").innerHTML = data.main.humidity + "%";
    document.querySelector(".sit").innerHTML = data.weather[0].description;
    document.querySelector(".wind").innerHTML =
      Math.round(data.wind.speed) + " kmph";
    const wicon = document.querySelector(".weather-icon");

    if (data.weather[0].main == "Clouds") {
      wicon.src = "images/cloudy.png";
      document.body.style.backgroundImage = "url('images/cloudbg.jpg')";
    }
    if (data.weather[0].main == "Clear") {
      wicon.src = "images/sunny.png";
      document.body.style.backgroundImage = "url('images/sunbg.jpg')";
    }
    if (data.weather[0].main == "Rain") {
      wicon.src = "images/rain.png";
      document.body.style.backgroundImage = "url('images/rainbg.jpg')";
    }
    if (data.weather[0].main == "Drizzle") {
      wicon.src = "images/storm.png";
      document.body.style.backgroundImage = "url('images/rainbg.jpg')";
    }
    if (data.weather[0].main == "Mist") {
      wicon.src = "images/haze.png";
      document.body.style.backgroundImage = "url('images/rainbg.jpg')";
    }
    if (data.weather[0].main == "Haze") {
      wicon.src = "images/haze.png";
      document.body.style.backgroundImage = "url('images/rainbg.jpg')";
    }

    document.querySelector(".weather").style.display = "block";
  }
}
searchbox.addEventListener("enter", () => {
  checkweather(searchbox.value);
});
searchbtn.addEventListener("click", () => {
  checkweather(searchbox.value);
});
