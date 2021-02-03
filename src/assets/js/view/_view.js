import {WeatherAPI} from '../api/weather.js'

let lat  = 14.6255
let lon  = 121.1245

async function getData(){
    let weatherData =await new WeatherAPI()
                        .getAllWeatherData(lat , lon)
                        .then(result => result)
    console.log(weatherData)
}

getData()