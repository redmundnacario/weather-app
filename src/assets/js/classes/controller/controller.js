
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
        

        this.UserModel.getCurrentUserData(this.UserView.navigationChange.bind(this.UserView))

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
