import {Event} from '../event/_event.js';

export class WeatherModel {
    constructor(){
        this.getWeatherDataEvent = new Event()
    }
}