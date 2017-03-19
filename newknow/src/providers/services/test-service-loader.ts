import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {CustomLogger} from "../logger";

@Injectable()
export class TestServiceLoader {


  constructor(public http: Http, public logger: CustomLogger) {
  }


  loadServices() : Promise<any> {
    this.logger.log("loadServices (testServiceLoader)");
    return new Promise((resolve) => {
      var services = {};
      services["distributeurs"] = {
        onTurnOnDisplay: "console.log('ok distrib'); return 1",
      };
      resolve(services);
    });
  }
}
