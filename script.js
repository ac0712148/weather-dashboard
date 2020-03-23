var api_key = "a939c8a0b17d9e6b6fdd30235956584a";
var search = "san+diego";
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + search + "&appid=" + api_key;


var city = response.name;
var temperature = response.main.temp;
var humidity = response.main.humidity;
var wind_speed = response.wind.speed;
var uv_index ;

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response){
    console.log(response);
    $("#city").text(response.name)
    $("temperature").text("Temperature: " + response)
})

