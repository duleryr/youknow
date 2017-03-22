import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LocationManager {

  constructor(public http: Http) {
    console.log('Hello LocationManager Provider');
  }

  getLastLocation(): Promise<any> {
    return Promise.resolve({
      latitude:45,
      longitude:3
    });
  }

}
