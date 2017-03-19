import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { constants } from '../config/config';
import 'rxjs/add/operator/map';


@Injectable()
export class Constants {

  constructor(public http: Http) {
    console.log('Hello Constants Provider');
  }

  get(constant_name) {
    return constants[constant_name];
  }

}
