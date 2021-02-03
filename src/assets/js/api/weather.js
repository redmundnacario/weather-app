
export class WeatherAPI{

    constructor () {
        this.data = undefined
        this.lat = undefined,
        this.lon = undefined
        this.default_lat = 14.5794,
        this.default_lon = 121.0359,
        this.url = undefined
    }

    async getAllWeatherData(lat, lon){
        let currentWx = await this.setCurrentWeatherDataUrl(lat,lon)
                            .getWeatherData()
                            .then(result => result.data)
        // console.log(currentWx)
    
    
        let forecastWx = await this.setForecastDataUrl(lat,lon)
                            .getWeatherData()
                            .then(result => result.data)
        // console.log(forecastWx)

        this.data = {
            current : currentWx,
            forecast : forecastWx
        }
        return this.data
    }
    // GET METHOD : weather data
    async getWeatherData() {

        if(this.url){
            let promise = await fetch(this.url)
            // console.log(promise)

            if (promise.ok == true) {
                let json = await promise.json()
                this.data = json
                // console.log(json)
            } else {
                throw Error(`Error Status: ${promise.status}`)
            }
        }
        return this
    }

    // Set url to get current weather data
    setCurrentWeatherDataUrl(lat,lon){
        if (lat === undefined && lon === undefined) {
            // use default if user location is not available
            lat = this.default_lat
            lon = this.default_lon
        }
        // console.log(config)
        this.url= `${config.WEATHER_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${config.WEATHER_KEY}`
        return this
    }

    // Set url to get weather forecast data
    setForecastDataUrl(lat, lon){
        if (lat === undefined && lon === undefined) {
            // use default if user location is not available
            lat = this.default_lat
            lon = this.default_lon
        }
        let exclude = `current,minutely,alert`
        this.url = `${config.WEATHER_URL}/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&units=metric&appid=${config.WEATHER_KEY}`
        return this
    }

}