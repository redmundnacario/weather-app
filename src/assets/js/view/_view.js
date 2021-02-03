import {Event} from '../event/event.js';

export class WeatherView {
    constructor() {
        this.getWeatherDataEvent = new Event()
    }

    render() {

        // 

        // Current Weather
        this.currentlocationDate = document.createElement("div")
        this.currentTemp = document.createElement("div")
        this.currentStats = document.createElement("div")

        //48 hours -limit to next 6 hours.
        this.forecastWxHourly = document.createElement("div")

        // 8 days
        this.forecastWxDaily = document.createElement("div")
    }
}


import {Geolocation} from '../api/geolocation.js'

async function getData(){
    let result = await new Geolocation()
        .parseLocation()
        .then(result => result)
    console.log(result)
}

getData()
