import {Event} from '../event/_event.js';


export class WeatherView {
    constructor() {
        this.getWeatherDataEvent = new Event()
    }

    render() {

        // Dom Selectors
        this.app = document.getElementById("app") //app section 
        this.row1 = document.getElementById("row1")
        this.row2 = document.getElementById("row2")
        this.row3 = document.getElementById("row3")
        this.row4 = document.getElementById("row4")

        // CREATE ELEMENTS

        // Current Weather
        this.currentlocationDate = document.createElement("div")
        this.currentWxDesc = document.createElement("div")
        this.currentStats = document.createElement("div")

        //48 hours -limit to next 6 hours.
        this.forecastWxHourly = document.createElement("div")

        // 8 days
        this.forecastWxDaily = document.createElement("div")

        //CURRENT WEATHER
        this.currentlocationDate.id = "locationDateId"
        this.currentWxDesc.id = "currentWxDescId"
        this.currentStats.id = "currentStatsId"
        this.forecastWxHourly.id = "WxHourlyId"
        this.forecastWxDaily.id = "WxDailyId"

        // Append created elements to Dom
        this.row1.appendChild(this.currentlocationDate)
        this.row2.appendChild(this.currentWxDesc)
        this.row2.appendChild(this.currentStats)
        this.row3.appendChild(this.forecastWxHourly)
        this.row4.appendChild(this.forecastWxDaily)

        // // Event listeners
        // this.app.onload = () => {
        //     this.getWeatherDataEvent.trigger()
        // }
    }

    updateCurrentLocationDate(data) {
        this.currentlocationDate.innerHTML = ""
        this.currLocH1 = document.createElement("h1")
        this.currLocH1.innerText = data.name
        this.currDateH3 = document.createElement("h3")
        this.currDateH3.innerText = data.dt

        this.currentlocationDate.appendChild(this.currLocH1)
        this.currentlocationDate.appendChild(this.currDateH3)
    }

    updateCurrentTemp(data){
        this.currentWxDesc.innerHTML = ""
        this.weatherImg = document.createElement("img")
        this.weatherImg.src= data.weather.icon

        this.currTemp = document.createElement("h1")
        this.currTemp.id = "currentTempId"
        this.currTemp.innerText = data.main.feels

        this.weatherDescription = document.createElement("div")
        this.weatherDescription.innerHTML = `<p>${data.weather.description}</p>`

        let container = document.createElement("div")
        container.appendChild(this.currTemp)
        container.appendChild(this.weatherDescription)

        this.currentWxDesc.appendChild(this.weatherImg)
        this.currentWxDesc.appendChild(container)
    }

    updateCurrentStats(data){

        this.currentStats.innerHTML = ""

        let status_list = {
            "tempMax": {
                title: "High",
                data: data.main.temp_max
            },
            "wind":{
                title: "Wind",
                data: data.wind.speed
            },
            "sunrise" : {
                title: "Sunrise",
                data:  data.sys.sunrise
            },
            "tempMin":{
                title: "Low",
                data: data.main.temp_min
            } ,
            "rain":{
                title: "Rain",
                data:  `0%`
            } ,
            "sunset":{
                title: "Sunset",
                data:  data.sys.sunset
            }
        }

        for (const status in status_list){
            let container = document.createElement("div")
            container.className = "status-box"

            let status_obj = status_list[status]

            let h2 = document.createElement("h2")
            let h4 = document.createElement("h4")
            h2.innerText = status_obj.data
            h4.innerText = status_obj.title

            container.appendChild(h2)
            container.appendChild(h4)

            this.currentStats.appendChild(container)
        }

    }

    updateWxHourly(data){
        let data_holder = data.slice(0,8)
        this.forecastWxHourly.innerHTML = ""

        for (const value of data_holder){
            let container = document.createElement("div")
            container.className = "hourly-box"

            let h4_1 = document.createElement("h4")
            let img = document.createElement("img")
            let h4_2 = document.createElement("h4")
            
            h4_1.innertText = value.dt
            img.src = value.weather.icon
            h4_2.innerText= value.feels_like

            container.appendChild(h4_1)
            container.appendChild(img)
            container.appendChild(h4_2)

            this.forecastWxHourly.appendChild(container)
        }
    }

    updateWxDaily(data){
        this.forecastWxDaily.innerHTML = ""

        let data_holder = data.slice(0,5)

        for (const value of data_holder){

            let status_list = {
                "tempMin":{
                    title: "Low",
                    data: value.temp.min
                } ,
                "tempMax": {
                    title: "High",
                    data: value.temp.max
                },
                "wind":{
                    title: "Wind",
                    data: value.wind_speed
                },
                "rain":{
                    title: "Rain",
                    data:  Math.floor(value.pop * 100)
                }
            } 
            let daily_container = document.createElement("div")
            daily_container.className = "daily-wx-box"

            let container = document.createElement("div")
            container.className = "daily-status-box"
            container.innerHTML = `
            <h2>${value.dt}<h2>
            <h4>${value.dt}<h4>
            `
            daily_container.appendChild(container)


            container = document.createElement("div")
            container.className = "daily-status-box"
            container.innerHTML = `
            <img src=${value.weather.icon} alt=${value.weather.description}>
            `
            daily_container.appendChild(container)
            
            for (const status in status_list){
                let container = document.createElement("div")
                container.className = "daily-status-box"

                let status_obj = status_list[status]

                let h2 = document.createElement("h2")
                let h4 = document.createElement("h4")
                h2.innerText = status_obj.data
                h4.innerText = status_obj.title

                container.appendChild(h2)
                container.appendChild(h4)

                daily_container.appendChild(container)
            }

            this.forecastWxDaily.appendChild(daily_container)
        }
    }

}
