import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {CustomLogger} from "../logger";

@Injectable()
export class LiveServiceLoader {


  constructor(public http: Http, public logger: CustomLogger) {
  }

  loadServices() : Promise<any> {
    this.logger.log("LiveServiceLoader : loadServices not yet implemented");
    return Promise.reject("nyi");
  }
}
