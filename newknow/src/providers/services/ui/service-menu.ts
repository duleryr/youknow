import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {ServiceFooter} from "./service-footer";
import {Events} from "ionic-angular";

@Injectable()
export class ServiceMenu {

  services: any;

  constructor(public http: Http, public serviceFooter: ServiceFooter, public events: Events) {
    this.services = [];

  }

  addService(service, isActivated) {
    var service_menu_data = service;
    service_menu_data['activated'] = isActivated;
    this.services.push(service_menu_data);
  }

  onToggle(service) {
    console.log(service);
    if (service['activated']) {
      this.serviceFooter.addService(service);
      this.turnOnDisplay(service);
    } else {
      this.serviceFooter.removeService(service);
      this.turnOffDisplay(service);
    }
  }

  turnOnDisplay(service) {
    this.events.publish('er:ui_event', service, 'onTurnOn', {});
  }

  turnOffDisplay(service) {
    this.events.publish('er:ui_event', service, 'onTurnOff', {});
  }

}
