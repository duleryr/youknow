import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {CustomLogger} from '../../logger';
@Injectable()
export class ServiceFooter {

  services: any;
  names: any;

  constructor(public http: Http, public logger: CustomLogger) {
    this.services = [];
  }

  addService(service) {
    console.log("in add footer", service);
    var service_footer_data = service['ui'];
    console.log(service_footer_data);
    service_footer_data['name'] = service['name'];
    this.services.push(service_footer_data);
  }

  removeService(service) {
    for (var i = 0; i < this.services.length; i++) {
      if (service['name'] == this.services[i]['name']) {
        this.services.splice(i, 1);
        break;
      }
    }
  }


}
