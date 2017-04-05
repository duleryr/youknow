import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {YkLatLng} from "../map/objects/yk/yk-lat-lng";

/**
 * Provider in charge of tracking the location of the user
 */
@Injectable()
export class LocationManager {

  constructor() {}


  

  /**
   * Get last known location of the user
   * @return [[YkLatLng]] object as an artificial promise
   */
  getLastLocation(): Promise<YkLatLng> {
    return Promise.resolve(new YkLatLng(45,3));
  }

}
