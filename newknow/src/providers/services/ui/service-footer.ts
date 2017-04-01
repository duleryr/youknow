import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {CustomLogger} from '../../logger';
@Injectable()
export class ServiceFooter {

  services: any;
  names: any;
  activeService: any;

  constructor(public http: Http, public logger: CustomLogger) {
    this.services = [];
    this.activeService = null;
  }

  addService(service) {
    this.services.push(service);
  }

  removeService(service) {
    for (var i = 0; i < this.services.length; i++) {
      if (service['name'] == this.services[i]['name']) {
        this.services.splice(i, 1);
        break;
      }
    }
  }

  setActiveService(service) {
    this.activeService = service;
    console.log("New active service !");
    console.log(this.activeService);
  }

  getActiveService() {
    return this.activeService;
  }


}
