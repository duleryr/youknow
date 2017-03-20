import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CustomLogger {

  constructor(public http: Http) {
    console.log('Hello CustomLogger Provider');
  }

  log(...args: any[]) {
    args.forEach(function(element) {
      console.log(element);
    });
  }

}
