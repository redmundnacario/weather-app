
/// ====================================================== //
// CONTROLLER.JS
// ====================================================== //

class Controller {
    constructor () {
        this.WeatherView = new WeatherView()
        this.WeatherModel = new WeatherModel()

        this.UserView = new UserView()
        this.UserModel = new UserModel()
        // this.WeatherView._bindLoadWeatherData(this.WeatherModel.loadCurrentData)

    }
    
    async run () {
        

        this.UserModel.getCurrentUserData(
            this.UserView.navigationChange.bind(this.UserView),
            this.UserView.toggleHomeAndAppPage.bind(this.UserView))

        this.UserView.searchLocation(
            this.UserModel.searchLocation.bind(this.UserModel),
            this.UserModel.addLocationUserData.bind(this.UserModel)
            )
        this.UserView.removeLocationUserData(this.UserModel.removeLocationUserData.bind(this.UserModel))

        this.WeatherView.render(
            this.WeatherModel.GetSampleData.bind(this.WeatherModel)
            // this.WeatherModel.GetWeatherFxDataFromCurentLocation.bind(this.WeatherModel)
        );
        
        // console.log(this.UserModel.currentUser)
        // if(currentUserData) {
        //     console.log("here")
        //     setTimeout(()=>{
        //         this.UserModel.addLocationUserData()
        //     }, 3000)
        // }
    }
}
