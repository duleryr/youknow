import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {MapProvider} from "../map-provider";

/*
  Generated class for the ContextBuilder provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ContextBuilder {

  constructor(public http: Http, public mapProvider: MapProvider) {
    console.log('Hello ContextBuilder Provider');
  }

  build() {
    return {
      map: this.mapProvider.map,
      latitude: 45,
      longitude: 2
    };
  }

}
