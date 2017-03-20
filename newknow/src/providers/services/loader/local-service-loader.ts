import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {CustomLogger} from "../../logger";

@Injectable()
export class LocalServiceLoader {


  constructor(public http: Http, public logger: CustomLogger) {
  }

  loadServices() : Promise<any> {
    this.logger.log("loadServices (localServiceLoader)");
    return new Promise((resolve) => {
      var services = {};
      services["distributeurs"] = {
        onTurnOnDisplay: "console.log(google.maps);return 3;",
      };
      resolve(services);
    });
  }
}
