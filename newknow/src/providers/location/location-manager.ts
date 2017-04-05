import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {YkLatLng} from "../map/objects/yk/yk-lat-lng";
import {Geolocation} from 'ionic-native';

/**
 * Provider in charge of tracking the location of the user
 */
@Injectable()
export class LocationManager {

  /**
   * Last location obtained
   */
  lastLocation: YkLatLng;

  constructor() {
    this.lastLocation = new YkLatLng(45,3);
  }

  /**
   * Get last known location of the user
   * @return [[YkLatLng]] object as an artificial promise
   */
  getLastLocation(): Promise<YkLatLng> {
    return Promise.resolve(this.lastLocation);
  }

  /**
   * Get current location of the user
   * Must be called when the location is available
   * @return [[YkLatLng]] object as an artificial promise
   */
  getCurrentLocation(): Promise<YkLatLng> {
    return new Promise( (resolve) => {
      Geolocation.getCurrentPosition().then(pos => {
        this.lastLocation = new YkLatLng(pos.coords.latitude, pos.coords.longitude);
        resolve(this.lastLocation);
      })
    });
  }
}
