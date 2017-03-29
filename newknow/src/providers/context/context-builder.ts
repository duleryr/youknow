import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {MapProvider} from "../map/map-provider";

@Injectable()
export class ContextBuilder {

  constructor(public http: Http, public mapProvider: MapProvider) {
    console.log('Hello ContextBuilder Provider');
  }

  build(service, parametres) {
    return {
      map: this.mapProvider.map,
      latitude: 45,
      longitude: 2,
      data: service['memory'],
      params: parametres
    };
  }

}
