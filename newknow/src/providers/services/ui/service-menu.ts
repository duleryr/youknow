import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {ServiceFooter} from "./service-footer";
import {ExecutionWrapper} from "../execution/execution-wrapper";
import {ContextBuilder} from "../../context/context-builder";

@Injectable()
export class ServiceMenu {

  services: any;

  constructor(public http: Http, public serviceFooter: ServiceFooter,
              public executionWrapper: ExecutionWrapper, public contextBuilder: ContextBuilder) {
    this.services = [];

  }

  addService(service, isActivated) {
    console.log("added service");
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
    console.log(service);
    var context = this.contextBuilder.build(service, {});
    this.executionWrapper.wrap(context, service['event']['onTurnOn']);
  }

  turnOffDisplay(service) {
    var context = this.contextBuilder.build(service, {});
    this.executionWrapper.wrap(context, service['event']['onTurnOff']);
  }

}
