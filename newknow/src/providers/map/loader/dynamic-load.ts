import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DynamicLoad {

  constructor(public http: Http) {
  }

  load(apiKey, mapElement): Promise<any> {
    return Promise.reject("Dynamic load : Not yet implemented");
  }

}
