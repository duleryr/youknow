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

  eventsToLookFor: any;

  constructor(public http: Http, public constants: Constants,
  public testServiceLoader: TestServiceLoader,
  public liveServiceLoader: LiveServiceLoader,
  public localServiceLoader: LocalServiceLoader,
  public logger: CustomLogger) {
  }

  fillEventsToLoad() {
    this.eventsToLookFor = [
      'onTurnOn',
      'onTurnOff',
      'onZoom',
      'onScroll',
      'onDragMarkDropped'
    ];
  }

  loadServices() : Promise<any> {
    this.fillEventsToLoad();
    switch (this.constants.get('serviceLoaderPolicy')) {
      case "test": {
        return this.testServiceLoader.loadServices(this.eventsToLookFor);
      }
      case "live": {
        return this.liveServiceLoader.loadServices(this.eventsToLookFor);
      }
      case "local": {
        return this.localServiceLoader.loadServices(this.eventsToLookFor);
      }
      default: {
        this.logger.log("Unknown policy " + this.constants.get('serviceLoaderPolicy') +
        " for serviceLoaderPolicy");
        return Promise.reject("Error in loadServices");
      }
    }
  }

}
