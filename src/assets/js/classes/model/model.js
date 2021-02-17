
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

    async getCurrentUserData( handler1 , handler2 ){
        auth.onAuthStateChanged(async(user) => {
            if (user) {
                console.log('user logged in: ', user.uid);
                this.currentUserData = await getUserProfileDocument(user)
                this.currentUser = user;
        
                // firestore.collection('guides').onSnapshot(snapshot => {
                //     setupGuides(snapshot.docs);
                //     setupUI(user);
                //   }, err => console.log(err.message));

                firestore.doc(`users/${user.uid}`)
                    .onSnapshot((doc) => {
                        console.log("Current data: ", doc.data());
                        handler1(user);
                        handler2(user)
                    });

            } else {
                console.log('user logged out');
                this.currentUserData = null;
                this.currentUser = null;
                handler1();
                handler2();
            }
            // console.log(this.currentUser)
        })    
    }

    async searchLocation(placeStr){
        let geocodeData = await new Geocoding()
                            .setGeocodingUrl(placeStr)
                            .getGeocodingData()
                            .then(result => result)

        // console.log(geocodeData)
        // filter data get location name and coordinates: "place_name" and "center"
        const resultArr = geocodeData.features.map(value => {
            return {
                [value.text] : {
                    lat : value.center[1], 
                    lon : value.center[0],
                }
            }
        })
        // console.log(resultArr)

        return resultArr
    }

    async addLocationUserData(data){
        await AddLocation(this.currentUser, data) 
    }

    async removeLocationUserData(data){
        await RemoveLocation(this.currentUser, data)
    }

}

