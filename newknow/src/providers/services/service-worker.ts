import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {ServiceLoader} from "./service-loader";
import {CustomLogger} from "../logger";

@Injectable()
export class ServiceWorker {

  services: any;

  constructor(public http: Http, public serviceLoader: ServiceLoader, public logger: CustomLogger) {
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
    if ("onTurnOnDisplay" in this.services[serviceName]) {
      var workerTemplate = "function userDefined(){" + this.services[serviceName]["onTurnOnDisplay"] + "}\
        postMessage(userDefined());\
        onmessage = function(e){\
          console.log(e);\
        }";
      var blob = new Blob([workerTemplate], {type: "text/javascript"});
      var wk = new Worker(window.URL.createObjectURL(blob));
      wk.onmessage = function (e) {
        console.log(serviceName + " onTurnOnDisplay done (" + e.data + ")");
      }
    }
  }

  turnOffDisplay(serviceName) {
    console.log("Turning off display for " + serviceName);
  }
}
