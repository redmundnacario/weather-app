
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
        // this.currentUser = getCurrentUser();
        this.currentUserData = null;
    }

    async getCurrentUserData( function1 ){
        auth.onAuthStateChanged(async(user) => {
            if (user) {
                console.log('user logged in: ', user.uid);
                this.currentUserData = await getUserProfileDocument(user)
                function1(user)

                // Test the add location
                // await this.addLocationUserData(user)
                // Test the remove location
                // await this.removeLocationUserData(user)
            } else {
                console.log('user logged out');
                this.currentUserData = null;
                function1()
            }
            // console.log(this.currentUser)
        })    
    }

    async addLocationUserData(user){
        await AddLocation(user) 
    }

    async removeLocationUserData(user){
        await RemoveLocation(user)
    }

}

