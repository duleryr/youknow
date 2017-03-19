import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CustomLogger {

  constructor(public http: Http) {
    console.log('Hello CustomLogger Provider');
  }

  log(...args: any[]) {
    for (var arg in args) {
      console.log(arg);
    }
  }

}
