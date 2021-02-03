export class Geolocation {
    constructor(){
        this.data = undefined;
    }

    getCurrentLocation(options) {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve,
                ({code, message}) =>
                    reject(
                        Object.assign(new Error(message), 
                        {name: "PositionError", code})
                    ),
                    options);
            });
      };

    async getUserLocation(){
    
        let options = navigator.platform  === 'android' ? null : {enableHighAccuracy: true, timeout: 100000, maximumAge: 1000}
      
        let result = await this.getCurrentLocation(options)
                        .then(result => result)

        return result
    }

    async parseLocation(){
        let result = await this.getUserLocation()
                        .then(result => result)

        this.data  = {
            current_latitude : result.coords.latitude.toFixed(4),
            current_longitude : result.coords.longitude.toFixed(4),
        }
        return this.data
    }
}
