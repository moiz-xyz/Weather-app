document.body.classList.add('dark-mode');

function lightenable() {
    document.body.classList.remove('dark-mode');
    document.body.classList.add('light-mode');
}

function darkenable() {
    document.body.classList.remove('light-mode');
    document.body.classList.add('dark-mode');
}

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
        weatherInfo.innerHTML = '<h3> Now ' +'</h3>' +
                            '<h1>' + data.main.temp + '°C </h1>' +
                            '<p>Weather in ' + data.weather[0].description + '</p>' +
                            '<p> ' + formattedDate+ '</p>' +
                            '<p> <i class="fa-solid fa-location-dot"></i> ' + data.name+ '</p>' 

})
.catch(function(error) {
    let weatherInfo = document.getElementById('data-details');
    weatherInfo.innerHTML = '<p>' + error.message + '</p>';
});
}


