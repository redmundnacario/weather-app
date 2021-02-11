
/// ====================================================== //
// MODEL.JS
// ====================================================== //

export class WeatherModel {
    constructor(){
        this.weatherData

    }
    async GetSampleData(){
        
        this.weatherData = await new WeatherAPI()
                            .getAllSampleWeatherData()
                            .then(result => result) 
        
        return this.weatherData
    }

    async GetWeatherFxDataFromCurentLocation() {
        let { 
            current_latitude, 
            current_longitude
            } = await new Geolocation()
                        .parseLocation()
                        .then(result => result)
        // console.log(result)
        

        this.weatherData = await new WeatherAPI()
                                .getAllWeatherData(current_latitude,
                                                   current_longitude)
                                .then(result => result)

        console.log(this.weatherData)
        return this.weatherData
    }


}

export class UserModel{
    constructor(){
        this.currentUserData = null;
    }

    getCurrentUserData(){
        auth.onAuthStateChanged(async(user) => {
            if (user) {
                console.log('user logged in: ', user);
                this.currentUserData = await getUserProfileDocument(user)
                console.log(this.currentUserData)
            } else {
                console.log('user logged out');
                this.currentUserData = null;
            }
        })
    }

    addLocationUserData(){

    }

    removeLocationUserData(){

    }

}

