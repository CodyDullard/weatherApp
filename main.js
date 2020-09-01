const api = {
    key: "3e9bd0c963d640b2f2e3c3f00ce41099",
    base: "https://api.openweathermap.org/data/2.5/"
};

const searchBox = document.querySelector('.search');
searchBox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if(evt.keyCode == 13) {
        getResults(searchBox.value);
    }
}

function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayResults);
}

function displayResults(weather) {
    console.log(weather);
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;
    imgSelector(weather_el.innerText);

    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}

function dateBuilder(now) {
    let months = ["January", "February", "March", "April", "May",
     "June", "July", "August","September", "October", 
     "November", "December"];
    let days = ["Monday", "Tuesday", "Wednesday", "Thursday",
     "Friday", "Saturday", "Sunday"];

    let day = days[now.getDay()];
    let date = now.getDate();
    let month = months[now.getMonth()];
    let year = now.getFullYear();
    
    return `${day} ${date} ${month} ${year}`;
}

function imgSelector(condition) {
    console.log(condition)
    switch(condition) {
        case "Clear":
            document.body.style.backgroundImage = "url('images/clear.jpg')";
            break;
        case "Thunderstorm":
            document.body.style.backgroundImage = "url('images/thunderstorm.jpg')";
            break;
        case "Drizzle":
            document.body.style.backgroundImage = "url('images/drizzle.jpg')";
            break;
        case "Rain":
            document.body.style.backgroundImage = "url('images/rain.jpg')";
            break;
        case "Snow":
            document.body.style.backgroundImage = "url('images/snow.jpg')";
            break;
        case "Atmosphere":
            document.body.style.backgroundImage = "url('images/atmosphere.jpg')";
            break;
        case "Clouds":
            document.body.style.backgroundImage = "url('images/clouds.jpg')";
            break;
    }
}