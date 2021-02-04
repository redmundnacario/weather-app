
/// ====================================================== //
// GEOCODING.JS
// ====================================================== //

class Geocoding {
    constructor() {
        this.url = undefined;
        this.data = undefined;
    }
    async getGeocodingData(){
        if(this.url){
            let promise = await fetch(this.url)
            // console.log(promise)

            if (promise.ok == true) {
                let json = await promise.json()
                this.data = json
                // console.log(json)
            } else {
                throw Error(`Error Status: ${promise.status}`)
            }
        }
        return this.data
    }
    setGeocodingUrl(placeString){
        placeString = encodeURI(placeString);
        this.url = `${config.GEOCODING_URL}/${placeString}.json?access_token=${config.GEOCODING_KEY}`
        // console.log(this.url)
        return this
    }

    setSampleGeocodingUrl(){
        this.url = '/assets/js/sample_data/geocoding_data.json'
        return this
    }
}