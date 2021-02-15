
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

    async GetWeatherFxData( current_latitude,
                            current_longitude ) {
       
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
        this.currentUser = null;
        this.currentUserData = null;
    }

    async getCurrentUserData( function1 ){
        auth.onAuthStateChanged(async(user) => {
            if (user) {
                console.log('user logged in: ', user.uid);
                this.currentUserData = await getUserProfileDocument(user)
                this.currentUser = user;
                function1(user)
                // firestore.collection('guides').onSnapshot(snapshot => {
                //     setupGuides(snapshot.docs);
                //     setupUI(user);
                //   }, err => console.log(err.message));

                firestore.collection("users").doc(user.uid)
                    .onSnapshot((doc) => {
                        console.log("Current data: ", doc.data());
                    });

            } else {
                console.log('user logged out');
                this.currentUserData = null;
                this.currentUser = null;
                function1()
            }
            // console.log(this.currentUser)
        })    
    }

    async addLocationUserData(){
        await AddLocation(this.currentUser) 
    }

    async removeLocationUserData(){
        await RemoveLocation(this.currentUser)
    }

}

