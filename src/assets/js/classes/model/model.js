
/// ====================================================== //
// MODEL.JS
// ====================================================== //

export class WeatherModel {
    constructor(){
        this.weatherData

    }
    async loadCurrentData(){
        
        this.weatherData = await new WeatherAPI()
                            .getAllSampleWeatherData()
                            .then(result => result) 
        
        return this.weatherData
    }


}