/**
 * @module MapLoader
 */ /** */

import {Injectable, ElementRef} from '@angular/core';
import 'rxjs/add/operator/map';
import {MapProvider} from "../map-provider";
import {YkMap} from "../objects/yk/yk-map";

/**
 * Class to load either a javascript map or a native map depending on the current environment.
 * This should only be accessible from [[MapLoader]].
 */
@Injectable()
export class DynamicLoad {

  constructor() {}

  /**
   * Load a Javascript map or a native map depending on the current environment
   * @param apiKey api key if needed to load the map
   * @param mapElement reference to the DOM object to populate
   * @param mapProvider [[MapProvider]]
   */
  load(apiKey: string, mapElement: ElementRef, mapProvider: MapProvider): Promise<YkMap> {
    return Promise.reject("Dynamic load : Not yet implemented");
  }

}
