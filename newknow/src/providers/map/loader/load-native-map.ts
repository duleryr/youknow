import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LoadNativeMap {

  constructor(public http: Http) {
  }

  load(apiKey, mapElement, mapProvider): Promise<any> {
    return Promise.reject("Native map load : Not yet implemented");
  }

}
