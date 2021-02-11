
/// ====================================================== //
// CONTROLLER.JS
// ====================================================== //

class Controller {
    constructor () {
        this.WeatherView = new WeatherView()
        this.WeatherModel = new WeatherModel()
        this.User = new UserModel()
        // this.WeatherView._bindLoadWeatherData(this.WeatherModel.loadCurrentData)

    }
    
    run () {
        this.User.getCurrentUserData();
        this.WeatherView.render(
            this.WeatherModel.GetSampleData.bind(this.WeatherModel)
            // this.WeatherModel.GetWeatherFxDataFromCurentLocation.bind(this.WeatherModel)
        );

    }
}
