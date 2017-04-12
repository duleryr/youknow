/**
 * @module MapLoader
 */ /** */

import { Injectable, ElementRef } from '@angular/core';
import 'rxjs/add/operator/map';
import { MapProvider } from '../map-provider';
import { YkNativeMap } from '../objects/native/yk-native-map';

/**
 * Class to load a native map.
 * This should only be accessible from [[MapLoader]].
 */
@Injectable()
export class LoadNativeMap {

  constructor() { }

  /**
   * Load a Javascript map or a native map depending on the current environment
   * @param apiKey api key if needed to load the map
   * @param mapElement reference to the DOM object to populate
   * @param mapProvider [[MapProvider]]
   */
  load(apiKey: string, mapElement: ElementRef, mapProvider: MapProvider): Promise<YkNativeMap> {
    return Promise.reject('Native map load : Not yet implemented');
  }

}
