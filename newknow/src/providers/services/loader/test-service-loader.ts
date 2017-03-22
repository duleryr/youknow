import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {CustomLogger} from "../../logger";

@Injectable()
export class TestServiceLoader {


  constructor(public http: Http, public logger: CustomLogger) {
  }


  loadServices(events) : Promise<any> {
    this.logger.log("loadServices (testServiceLoader)");
    return new Promise((resolve) => {
      var services = {};
      services["distributeurs"] = {
        onTurnOnDisplay: "var marker = new google.maps.Marker({\
        map: ctx.map,\
        position: new google.maps.LatLng(45,2)\
      })",
      };
      resolve(services);
    });
  }
}
