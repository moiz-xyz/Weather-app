document.body.classList.add('dark-mode');

function lightenable() {
    document.body.classList.remove('dark-mode');
    document.body.classList.add('light-mode');
}

function darkenable() {
    document.body.classList.remove('light-mode');
    document.body.classList.add('dark-mode');
}

function getdata () {
    
    function getWeather (){ 
        let city = document.getElementById("city").value
        const api_key = `928754d34862d5c9491233f6ec79e1ff` ;
         let open_api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;
    fetch (open_api)
    .then(function (response){
        if ( response.ok){
        return response.json()
        } else{
            throw new Error("City not found");
    
        }
     })
       .then(function(data) {
        let weatherInfo = document.getElementById("weather-details");
        let timestamp = data.dt;
        let date = new Date(timestamp * 1000);
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let months = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
    
        let formattedDate = `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]}`;
    
           if (data.main.temp <=20){
        weatherInfo.innerHTML = '<h3> Now ' +'</h3>' +
        '<h1>' + data.main.temp + '°C <i class="fa-solid fa-snowflake"></i> </h1>' +
        '<p>Weather in ' + data.weather[0].description + '</p>' +
        '<p> ' + formattedDate+ '</p>' +
        '<p id ="lastpara"> <i class="fa-solid fa-location-dot"></i> ' + data.name+ '</p>' 
        } else if ( data.main.temp > 20 && data.main.temp <= 30 ){
            weatherInfo.innerHTML = '<h3> Now </h3>' +
                                '<h1>' + data.main.temp + '°C <i class="fa-solid fa-cloud-sun"></i> </h1>' +
                                '<p>Weather in ' + data.weather[0].description + '</p>' +
                                '<p> ' + formattedDate+ '</p>' +
                                '<p id ="lastpara"> <i class="fa-solid fa-location-dot"></i> ' + data.name+ '</p>'
                            } else{
                                weatherInfo.innerHTML = '<h3> Now ' +'</h3>' +
                                '<h1>' + data.main.temp + '°C <i class="fa-solid fa-cloud-sun"></i> </h1>' +
                                '<p>Weather in ' + data.weather[0].description + '</p>' +
                                '<p> ' + formattedDate+ '</p>' +
                                '<p id ="lastpara"> <i class="fa-solid fa-location-dot"></i> ' + data.name+ '</p>'
                            }
                            
                        })
        .catch(function(error) {
        let weatherInfo = document.getElementById('data-details');
        weatherInfo.innerHTML = '<p>' + error.message + '</p>';
    });
    }


    //  air pollltiion api
    function getAirqulity(){
     let city2 = document.getElementById("city").value;
        const api_key2 = `928754d34862d5c9491233f6ec79e1ff` ;
        let air_api = `http://api.openweathermap.org/data/2.5/air_pollution?q=${city2}&appid=${api_key2}&units=metric`
        fetch(air_api)
        .then(function (response){
            if (response.ok){
                return response.json()
            } else {
                throw new Error ("City not founded")
            }
        })
        .then( function (dataofair){
            let today = document.getElementById("air");
            const aqiLevels = ["Good", "Fair", "Moderate", "Poor", "Very Poor"];
            today.innerHTML = `<h3>Todays Highlights</h3>`
            `<p> Air Quality Index  ${dataofair.list[0].aqi} </p>`
        })
        .catch(function(error) {
            let todayair = document.getElementById('air');
            todayair.innerHTML = '<p>' + error.message + '</p>';
        });
    
    }
    getWeather();
    getAirqulity();
}

