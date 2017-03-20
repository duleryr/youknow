import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class Util {

  constructor(public http: Http) {
    console.log('Hello Constants Provider');
  }

  readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
      if (rawFile.readyState === 4 && rawFile.status == 200) {
        callback(rawFile.responseText);
      }
    };
    rawFile.send(null);
  }

}
