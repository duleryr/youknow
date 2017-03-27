import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {MapProvider} from "../map/map-provider";
import {ServiceWorker} from "../services/service-worker";

/*
  Generated class for the ContextBuilder provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ContextBuilder {

  constructor(public http: Http, public mapProvider: MapProvider, public serviceWorker: ServiceWorker) {
    console.log('Hello ContextBuilder Provider');
  }

  build(serviceName) {
    return {
      map: this.mapProvider.map,
      latitude: 45,
      longitude: 2
    };
  }

}
