
/// ====================================================== //
// CONTROLLER.JS
// ====================================================== //

class Controller {
    constructor () {
        this.WeatherView = new WeatherView()
        this.WeatherModel = new WeatherModel()

        // this.WeatherView._bindLoadWeatherData(this.WeatherModel.loadCurrentData)

    }
    
    run () {
        this.WeatherView.render(
            this.WeatherModel.loadCurrentData.bind(this.WeatherModel)
        )
    }
}
