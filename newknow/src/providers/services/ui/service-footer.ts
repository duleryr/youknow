import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {CustomLogger} from '../../logger';
@Injectable()


/**
 * Comment service footer
 */ /** */
export class ServiceFooter {
  /**
   * Comment service footer
   */
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
    if (this.activeService != null) {
      this.activeService['runtime']['is_active'] = false;
    }
    this.activeService = service;
    this.activeService['runtime']['is_active'] = true;
  }

  getActiveService() {
    return this.activeService;
  }


}
