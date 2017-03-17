import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ServiceProvider {

  services: any;

  constructor(public http: Http) {
    this.loadTestData();
  }

  loadTestData() {
    this.services = {};
    this.services["PingService"] = {};
    this.services["PingService"]["display"] = false;
    this.services["PingService"]["onTurnOnDisplay"] = "console.log('in on turn on pingserv');return 1;";
  }

  service_names() : Array<string> {
    return Object.keys(this.services);
  }

  turnOnDisplay(serviceName) {
    console.log("Turning on display for " + serviceName);
    this.services[serviceName]["display"] = true;
    var workerTemplate = "function userDefined(){" + this.services["PingService"]["onTurnOnDisplay"] + "}\
      postMessage(userDefined());\
      onmessage = function(e){\
        console.log(e);\
      }";
    var blob = new Blob([workerTemplate], {type: "text/javascript"});
    var wk = new Worker(window.URL.createObjectURL(blob));
    wk.onmessage = function(e) {
      console.log('Function result:', e.data);
    }
  }

  turnOffDisplay(serviceName) {
    console.log("Turning off display for " + serviceName);
  }
}
