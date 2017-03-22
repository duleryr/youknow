import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Constants} from "../../constants";
import {DynamicLoad} from "./dynamic-load";
import {LoadJsMap} from "./load-js-map";
import {LoadNativeMap} from "./load-native-map";

@Injectable()
export class MapLoader {

  constructor(public http: Http, public constants: Constants, public dynamicLoad: DynamicLoad,
              public loadJsMap: LoadJsMap, public loadNativeMap: LoadNativeMap) {
  }

  load(apiKey, mapElement): Promise<any> {
    switch (this.constants.get('mapLoaderPolicy')) {
      case "javascript": {
        return this.loadJsMap.load(apiKey, mapElement);
      }
      case "native": {
        return this.loadNativeMap.load(apiKey, mapElement);
      }
      case "dynamic": {
        return this.dynamicLoad.load(apiKey, mapElement);
      }
      default: {
        console.log("Unknown policy " + this.constants.get('mapLoaderPolicy') +
          " for mapLoaderPolicy");
        return Promise.reject("Error in loadMap");
      }
    }
  }

}
