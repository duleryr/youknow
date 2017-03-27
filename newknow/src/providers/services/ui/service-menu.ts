import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ServiceMenu {

  services: any;
  names: any;

  constructor(public http: Http) {

  }

}
