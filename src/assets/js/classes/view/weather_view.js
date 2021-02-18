
export class WeatherView {
    constructor() {
       
    }

    async render(handler , lat, lon) {

         // Dom Selectors
        // this.app = document.getElementById("app") //app section 
        this.weatherView = document.createElement("div")

        this.row1 = document.createElement("div")
        this.row1.className = "row1"

        this.row2 = document.createElement("div")
        this.row2.className = "row2"

        this.row3 = document.createElement("div")
        this.row3.className = "row3"

        this.row4 = document.createElement("div")
        this.row4.className = "row4"


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
        this.currentlocationDate.className = "locationDate"
        this.currentWxDesc.className = "currentWxDesc"
        this.currentStats.className = "currentStats"
        this.forecastWxHourly.className = "WxHourly"
        this.forecastWxDaily.className = "WxDaily"

        /////////

        // Append created elements to Dom
        this.row1.appendChild(this.currentlocationDate)
        this.row2.appendChild(this.currentWxDesc)
        this.row2.appendChild(this.currentStats)
        this.row3.appendChild(this.forecastWxHourly)
        this.row4.appendChild(this.forecastWxDaily)

        // Load Weather data
        let result = await handler(lat, lon)

        // console.log(result)

        this.updateCurrentLocationDate(result.current) 
        this.updateCurrentTemp(result.current) 
        this.updateCurrentStats(result.current) 
        this.updateWxHourly(result.forecast.hourly) 
        this.updateWxDaily(result.forecast.daily)

        this.weatherView.appendChild(this.row1)
        this.weatherView.appendChild(this.row2)
        this.weatherView.appendChild(this.row3)
        this.weatherView.appendChild(this.row4)
        // console.log(this.weatherView)
        return this.weatherView 
    }

    updateCurrentLocationDate(data) {
        this.currentlocationDate.innerHTML = ""
        this.currLocH1 = document.createElement("h1")
        this.currLocH1.innerText = data.name
        this.currDateH3 = document.createElement("h3")
        this.currDateH3.innerText = convertUnix(data.dt)

        this.currentlocationDate.appendChild(this.currLocH1)
        this.currentlocationDate.appendChild(this.currDateH3)
    }

    updateCurrentTemp(data){
        this.currentWxDesc.innerHTML = ""
        this.weatherImg = document.createElement("img")
        this.weatherImg.src= `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`

        this.currTemp = document.createElement("h1")
        this.currTemp.className = "currentTemp"
        this.currTemp.innerText = data.main.feels_like

        this.weatherDescription = document.createElement("div")
        this.weatherDescription.innerHTML = `<p>${data.weather[0].description}</p>`

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
            
            // console.log(value.weather)
            h4_1.innertText = value.dt
            img.src = `https://openweathermap.org/img/wn/${value.weather[0].icon}@2x.png`
            
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
            <img src="https://openweathermap.org/img/wn/${value.weather[0].icon}@2x.png" alt=${value.weather.description}>
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
