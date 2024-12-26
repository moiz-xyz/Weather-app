document.body.classList.add('dark-mode');

function lightenable() {
    document.body.classList.remove('dark-mode');
    document.body.classList.add('light-mode');
}

function darkenable() {
    document.body.classList.remove('light-mode');
    document.body.classList.add('dark-mode');
}

   function getdata() {
       
       function getWeather() {
           let city = document.getElementById("city").value;
           const api_key = `928754d34862d5c9491233f6ec79e1ff`;
        let open_api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;
        fetch(open_api)
            .then(function (response) {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("City not found");

                }
            })
            .then(function (data) {
                let weatherInfo = document.getElementById("weather-details");
                let timestamp = data.dt;
                let date = new Date(timestamp * 1000);
                let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                let months = [
                    "January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
                ];

                let formattedDate = `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]}`;

                if (data.main.temp <= 20) {
                    weatherInfo.innerHTML = '<h3> Now ' + '</h3>' +
                        '<h1>' + data.main.temp + '°C <i class="fa-solid fa-snowflake"></i> </h1>' +
                        '<p>Weather in ' + data.weather[0].description + '</p>' +
                        '<p> ' + formattedDate + '</p>' +
                        '<p id ="lastpara"> <i class="fa-solid fa-location-dot"></i> ' + data.name + '</p>'
                } else if (data.main.temp > 20 && data.main.temp <= 30) {
                    weatherInfo.innerHTML = '<h3> Now </h3>' +
                        '<h1>' + data.main.temp + '°C <i class="fa-solid fa-cloud-sun"></i> </h1>' +
                        '<p>Weather in ' + data.weather[0].description + '</p>' +
                        '<p> ' + formattedDate + '</p>' +
                        '<p id ="lastpara"> <i class="fa-solid fa-location-dot"></i> ' + data.name + '</p>'
                } else {
                    weatherInfo.innerHTML = '<h3> Now ' + '</h3>' +
                        '<h1>' + data.main.temp + '°C <i class="fa-solid fa-cloud-sun"></i> </h1>' +
                        '<p>Weather in ' + data.weather[0].description + '</p>' +
                        '<p> ' + formattedDate + '</p>' +
                        '<p id ="lastpara"> <i class="fa-solid fa-location-dot"></i> ' + data.name + '</p>'
                }
                  let today_time = document.getElementById("time");
                  let time_rise =  data.sys.sunrise;
                  let time_set =  data.sys.sunset;
                  let date_new = new Date (time_rise *1000);
                  let date_new2 = new Date (time_set *1000);

                  today_time.innerHTML = `<h4>SunRise & Sunset</h4>
                  <p><i class="fas fa-sun"></i>  Sun rise ${date_new.toLocaleTimeString()}</p>
                <p> <i class="fa-solid fa-moon"></i>  Sun Set ${date_new2.toLocaleTimeString()}</p>`
                let humidity = document.getElementById("humidity");
                humidity.innerHTML = `
                 <h4> Humidity</h4>
                 <p><i class="fa-solid fa-droplet"></i> ${data.main.humidity}%</p>`
                 let pressure = document.getElementById("pressure");
                 pressure.innerHTML = `
                 <h4> Presssure</h4>
                 <p> <i class="fa-solid fa-gauge"></i> ${data.main.pressure}hPa</p> `

                 let visibility = document.getElementById("visi");
                 visibility.innerHTML = `
                 <h4> Visibility</h4>
                 <p> <i class="fa-regular fa-eye"></i> ${data.visibility/1000}km</p> `

                 let feels = document.getElementById("feels");
                 feels.innerHTML = `
                 <h4> Feels like </h4>
                 <p> <i class="fa-solid fa-temperature-three-quarters"></i> ${data.main.feels_like}°C</p> `
                let lat = data.coord.lat;
                let lon = data.coord.lon;
                getAirQuality(lat,lon);
                dailyfetch(lat,lon);
                hourly(lat,lon);
                // console.log(`Latitude: ${lat}, Longitude: ${lon}`);


            })
            .catch(function (error) {
                let weatherInfo = document.getElementById("weather-details");
                weatherInfo.innerHTML = '<p>' + error.message + '</p>';
            });
    }


    //  air pollltiion api
    function getAirQuality(lat, lon) {
        const api_key2 = `928754d34862d5c9491233f6ec79e1ff`;
        let air_api = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${api_key2}`;

        fetch(air_api)
            .then(function (response) {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("City not founded")
                }
            })
            .then(function (dataofair) {
                let today = document.getElementById("air");
                const aqiLevels = ["Good", "Fair", "Moderate", "Poor", "Very Poor"];
                let aqi =  dataofair.list[0].main.aqi;
                today.innerHTML = `
                <h4> Air Quality Index:<b>  ${aqiLevels[aqi -1]}</b> </h4>  
                <p> PM 2.5 ${dataofair.list[0].components.pm2_5} </p> 
                <p> S0<sub>2</sub> ${dataofair.list[0].components.so2} </p> 
                <p> NO<sub>2</sub> ${dataofair.list[0].components.no2} </p> 
                <p> O<sub>3</sub> ${dataofair.list[0].components.o3} </p>  `
                
            })
            .catch(function (error) {
                let today = document.getElementById('todays-higl');
                today.innerHTML = '<p>' + error.message + '</p>';
            });

    }

    
    
    //  Days  forcast api 
    function dailyfetch (lat,lon){
        const api_key3 = `928754d34862d5c9491233f6ec79e1ff`;
      let daily_api = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key3}`;
     
      fetch(daily_api)
        .then(function(response){
if (response.ok){
    return response.json()
} else {
    throw new Error("City not founded")
}
})
.then(function (dataofdaily) {
    let days_forcast = document.getElementById("days-forcast");
    let max_temp = {};
        const weatherIcons = {
            "Clear": "fas fa-sun", // Clear weather
            "Clouds": "fas fa-cloud", // Cloudy
            "Rain": "fas fa-cloud-showers-heavy", // Rainy
            "Snow": "fas fa-snowflake", // Snowy
            "Thunderstorm": "fas fa-bolt", // Thunderstorm
            "Drizzle": "fas fa-cloud-rain", // Light rain
            "Mist": "fas fa-smog" // Mist
        };

    for (let i = 0; i < dataofdaily.list.length; i++) {
        let forcast = dataofdaily.list[i];
        let date = forcast.dt_txt.split(" ")[0];
        let tempInCels = (forcast.main.temp_max - 273.15).toFixed(2); // Convert Kelvin to Celsius
        let weatherCondition = forcast.weather[0].main;

        // If the date is not already in the max_temp object
        if (!max_temp[date]) {
            max_temp[date] = { temp: tempInCels, icon: weatherIcons[weatherCondition] };
        } else {
            // Compare and update the max temperature for that day
            max_temp[date].temp = Math.max(max_temp[date].temp, tempInCels); // Update temperature
        }
    }

    // Build the HTML for the forecast
    let forecastHTML = '<h3>6 Days Forecast</h3>';
    for (let date in max_temp) {
        let iconClass = max_temp[date].icon || "fas fa-question-circle"; // Default icon if no match
        forecastHTML += `
            <li>
                ${date}: <b> ${max_temp[date].temp}°C </b> 
                <i class="${iconClass}"></i>
            </li>
        `;
    }

    days_forcast.innerHTML = forecastHTML;

})
.catch(function (error) {
    let today = document.getElementById('days-forcast');
    today.innerHTML = '<p>' + error.message + '</p>';
})

}


//  Hourly fetch 
function hourly (lat,lon){
    let time = dt_txt
    const api_key4 = `928754d34862d5c9491233f6ec79e1ff`;
    const apihouly = `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${time}&appid=${api_key4}`
fetch(apihouly)
    .then ( function (response){
       if(response.ok){
            return response.json()
        } else{
            throw new Error ("City not founded ")
        }
    })
    .then (function (dataOfhoulry){
        console.log(dataOfhoulry);
        
    })
    .catch(function (error){
        let hourly = document.getElementById('time_fetch');
        hourly.innerHTML = '<p>' + error.message + '</p>';
    })
}





   document.querySelector('.main').style.display = 'block';
      getWeather();

}

