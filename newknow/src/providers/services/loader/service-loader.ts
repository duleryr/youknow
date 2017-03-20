import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Constants} from "../../constants";
import {TestServiceLoader} from "./test-service-loader";
import {LiveServiceLoader} from "./live-service-loader";
import {CustomLogger} from "../../logger";
import {LocalServiceLoader} from "./local-service-loader";

@Injectable()
export class ServiceLoader {


  constructor(public http: Http, public constants: Constants,
  public testServiceLoader: TestServiceLoader,
  public liveServiceLoader: LiveServiceLoader,
  public localServiceLoader: LocalServiceLoader,
  public logger: CustomLogger) {
  }

  loadServices() : Promise<any> {
    switch (this.constants.get('serviceLoaderPolicy')) {
      case "test": {
        return this.testServiceLoader.loadServices();
      }
      case "live": {
        return this.liveServiceLoader.loadServices();
      }
      case "local": {
        return this.localServiceLoader.loadServices();
      }
      default: {
        this.logger.log("Unknown policy " + this.constants.get('serviceLoaderPolicy') +
        " for serviceLoaderPolicy");
        return Promise.reject("Error in loadServices");
      }
    }
  }

}
