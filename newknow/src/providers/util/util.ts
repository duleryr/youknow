import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Util {

  constructor(public http: Http) {
  }

  readTextFile(file): Promise<any> {
    return new Promise((resolve, reject) => {
      let rawFile = new XMLHttpRequest();
      rawFile.overrideMimeType('application/json');
      rawFile.open('GET', file, true);
      rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
          if (rawFile.status === 200) {
            resolve(rawFile.responseText);
          } else {
            reject(rawFile.status);
          }
        }
      };
      rawFile.send(null);
    });
  }

}
