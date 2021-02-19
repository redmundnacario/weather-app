
/// ====================================================== //
// CONTROLLER.JS
// ====================================================== //

class Controller {
    constructor () {
        this.WeatherView = new WeatherView()
        this.WeatherTabsView = new WeatherTabsView() 
        this.WeatherModel = new WeatherModel()

        this.UserView = new UserView()
        this.UserModel = new UserModel()
        // this.WeatherView._bindLoadWeatherData(this.WeatherModel.loadCurrentData)

    }
    
    async run () {
        
        // this.UserModel.weatherModel = this.WeatherModel
        this.UserModel.getCurrentUserData(
            this.UserView.navigationChange.bind(this.UserView),
            this.UserView.toggleHomeAndAppPage.bind(this.UserView),
            this.WeatherTabsView.render.bind(this.WeatherTabsView),
            this.WeatherView.render.bind(this.WeatherView),
            // this.WeatherModel.GetSampleData.bind(this.WeatherModel)
            // this.WeatherModel.GetWeatherFxDataFromCurentLocation.bind(this.WeatherModel)
            this.WeatherModel.GetWeatherFxData.bind(this.WeatherModel)
        )
        
        this.UserView.searchLocation(
            this.UserModel.searchLocation.bind(this.UserModel),
            this.UserModel.addLocationUserData.bind(this.UserModel),
            )
        // this.UserView.removeLocationUserData(this.UserModel.removeLocationUserData.bind(this.UserModel))

        
    }
}
