/**
 * @module MapLoader
 */ /** */

import { Injectable, ElementRef } from '@angular/core';
import 'rxjs/add/operator/map';
import { Constants } from '../../constants';
import { DynamicLoad } from './dynamic-load';
import { LoadJsMap } from './load-js-map';
import { LoadNativeMap } from './load-native-map';
import { YkMap } from '../objects/yk/yk-map';
import { MapProvider } from '../map-provider';

/**
 * Public interface of the [[MapLoader]] module. Called from [[MapProvider]].
 * Load the map to be displayed with the [[load]] method. This method is meant to be called once
 * at the start of the application.
 */
@Injectable()
export class MapLoader {

  /**
   * @param constants [[Constants]] provider, used to know which policy apply to load the map
   * in it's 'mapLoaderPolicy' entry. 3 values are possible for this entry : 'javascript',
   * 'native' or 'dynamic'.
   * @param dynamicLoad [[DynamicLoad]] provider, used for the 'dynamic' load policy.
   * @param loadJsMap [[LoadJsMap]] provider, used for the 'javascript' load policy.
   * @param loadNativeMap [[LoadNativeMap]] provider, used for the 'native' load policy.
   */
  constructor(public constants: Constants, public dynamicLoad: DynamicLoad,
    public loadJsMap: LoadJsMap, public loadNativeMap: LoadNativeMap) {
  }

  /**
   * Load the map for the policy defined in the 'mapLoaderPolicy' entry of [[Constants]]
   * @param apiKey api key if needed to load the map
   * @param mapElement reference to the DOM object to populate
   * @param mapProvider [[MapProvider]]
   * @returns [[YkMap]] as a promise. Rejected if the policy is ill-formed or the chosen policy
   * rejects for any reason.
   */
  load(apiKey: string, mapElement: ElementRef, mapProvider: MapProvider): Promise<YkMap> {
    switch (this.constants.get('mapLoaderPolicy')) {

      // 'javascript' policy : call loadJsMap
      case 'javascript': {
        return this.loadJsMap.load(apiKey, mapElement, mapProvider);
      }

      // 'native' policy : call loadNativeMap
      /* falls through */
      case 'native': {
        return this.loadNativeMap.load(); // TODO apiKey, mapElement, mapProvider);
      }

      // 'dynamic' policy : call dynamicLoad
      /* falls through */
      case 'dynamic': {
        return this.dynamicLoad.load(); // TODO apiKey, mapElement, mapProvider);
      }

      // unknown policy
      /* falls through */
      default: {
        console.log('Unknown policy ' + this.constants.get('mapLoaderPolicy') +
          ' for mapLoaderPolicy');
        return Promise.reject('Error in loadMap');
      }
    }
  }

}
