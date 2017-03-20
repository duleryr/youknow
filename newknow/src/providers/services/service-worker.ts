import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {ServiceLoader} from "./loader/service-loader";
import {CustomLogger} from "../logger";
import {MapProvider} from "../map-provider";
import {ExecutionWrapper} from "./execution/execution-wrapper";

@Injectable()
export class ServiceWorker {

  services: any;

  constructor(public http: Http, public serviceLoader: ServiceLoader, public logger: CustomLogger,
              public mapProvider: MapProvider, public executionWrapper: ExecutionWrapper) {
    this.services = {};
    this.serviceLoader.loadServices().then(services => {
      this.services = services;
    })
  }

  service_names() : Array<string> {
    return Object.keys(this.services);
  }

  turnOnDisplay(serviceName) {
    this.logger.log("Turning on display for " + serviceName);
    this.services[serviceName]["display"] = true;
    var context = {
      map: this.mapProvider.getMap()
    };
    this.executionWrapper.wrap(context, this.services[serviceName]["onTurnOnDisplay"]);
  }

  turnOffDisplay(serviceName) {
    console.log("Turning off display for " + serviceName);
  }
}
