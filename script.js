var api_key = "a939c8a0b17d9e6b6fdd30235956584a";
var search = "san+diego";

var date;
var forecast_temp;
var forecast_humid;
var j = 1;

var saves = {
    cities: []
};

function displayDefault(){
    search = "san+diego";
    getCurrentWeather();
    getForecast();
}
function getCurrentWeather(){
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + search + "&appid=" + api_key,
        method: "GET"
    }).then(function(response){
        var city = response.name;
        var temperature = parseInt(response.main.temp) * 1.8 - 459.67;
        var humidity = response.main.humidity;
        var wind_speed = response.wind.speed;
        var uv_index;
        var lat = response.coord.lat;
        var lon = response.coord.lon;
        var iconcode = response.weather[0].icon;
        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/uvi?appid="+api_key+"&lat="+lat+"&lon="+lon,
            method: "GET"
        }).then(function(uv_data){
            uv_index = parseInt(uv_data.value);
            $("#uv-index").text("UV Index: " + uv_index);
            if(uv_index >= 11){$("#uv-index").css("background-color","violet");}
            else if(uv_index >= 8){$("#uv-index").css("background-color","red");}
            else if(uv_index >= 6){$("#uv-index").css("background-color","orange");}
            else if(uv_index >= 3){$("#uv-index").css("background-color","yellow");}
            else if(uv_index >= 0){$("#uv-index").css("background-color","green");}
        })
        $("#city").text(city);
        $('#wicon').attr('src', iconurl);
        $("#temperature").text("Temperature: " + temperature.toFixed(2) + "°F");
        $("#humidity").text("Humidity: " + humidity + "%");
        $("#wind-speed").text("Wind Speed: " + wind_speed + " MPH");
        saves.cities.push(city);
        var uniqueNames = [];
        $.each(saves.cities, function(i, el){
        if($.inArray(el, uniqueNames) === -1)
            uniqueNames.push(el);
        });
        saves.cities=uniqueNames;
        console.log(saves);
    })
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/forecast?q=" + search + "&appid=" + api_key,
        method: "GET"
    }).then(function(five_day_data){
        for(var i = 0; i < five_day_data.list.length; i+=8) {
            forecast_temp = parseInt(five_day_data.list[i].main.temp) * 1.8 - 459.67;
            forecast_humid = five_day_data.list[i].main.humidity;
            var iconcode = five_day_data.list[i].weather[0].icon;
            var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
            $('#wicon'+j).attr('src', iconurl);
            $(".head"+j).text(five_day_data.list[i].dt_txt);
            $(".temp"+j).text("Temperature: " + forecast_temp.toFixed(2) + "°F");
            $(".hum"+j).text("Humidity: " + forecast_humid + "%");
            j++;
        }
        j=1;
    })
}

displayDefault();
if(localStorage.getItem("saves") !== null){
    var saves = JSON.parse(localStorage.getItem("saves"));
}
$("#run-search").on("click", function(event) {
    
    event.preventDefault();
    search=$("#search-term").val().trim();
    getCurrentWeather();
    localStorage.setItem("saves", JSON.stringify(saves));
    setUpHistory();
  });