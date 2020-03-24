# Weather Dashboard

## Description

For this project, we create a weather dashboard that displays weather conditions of a searched city. 
The data we retrieve is from [OpenWeather API](https://openweathermap.org/api) where we render it to display the current weather as well as a 5-Day forecast.

This web app runs in browser and relies on dynamically updated HTML and CSS powered by jQuery as well as the Bootstrap framework for the layout design.

## Files

The files used for this task are as follow:
* `index.html`
* `style.css`
* `script.js`
* `README.md`

## Details

Using HTML and CSS, we create a dashboard that displays weather data retrieved from the [OpenWeather API](https://openweathermap.org/api). We use the data to display the current weather forecast that includes temperature, humidity, wind speed, and the UV index. 

We also display a 5-Day forecast that shows the date forecasted, temperature, and humidity. Both the current weather and the 5 day forecast display a weather icon that helps visualize the conditions.

The UV index is also customized to change color at different levels of UV rays exposure. The colors are as follow for each level of UV index:
* 0-2: Green = Low 
* 3-5: Yellow = Moderate
* 6-7: Orange = High
* 8-10: Red = Very High
* 11+: Violet = Extreme

The colors are updated when the data is retrieved with the AJAX calls at the loading of the search.