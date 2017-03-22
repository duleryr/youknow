import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {ServiceLoader} from "./loader/service-loader";
import {CustomLogger} from "../logger";
import {MapProvider} from "../map/map-provider";
import {ExecutionWrapper} from "./execution/execution-wrapper";
import {ContextBuilder} from "../context/context-builder";

@Injectable()
export class ServiceWorker {

  services: any;
  names: any;

  constructor(public http: Http, public serviceLoader: ServiceLoader, public logger: CustomLogger,
              public mapProvider: MapProvider, public executionWrapper: ExecutionWrapper,
              public contextBuilder: ContextBuilder) {
    this.logger.log("[Service-worker] Constructor");
    this.services = {};
    this.names = [];
    this.serviceLoader.loadServices().then(services => {
      this.services = services;
      this.names = Object.keys(this.services);
      this.logger.log("[Service-worker] Services loaded");
    })
  }

  turnOnDisplay(serviceName) {
    this.services[serviceName]["display"] = true;
    var context = this.contextBuilder.build();
    this.executionWrapper.wrap(context, this.services[serviceName]['event']["onTurnOn"]);
  }

  turnOffDisplay(serviceName) {
    this.services[serviceName]["display"] = false;
    var context = this.contextBuilder.build();
    this.executionWrapper.wrap(context, this.services[serviceName]['event']["onTurnOff"]);
  }
}
