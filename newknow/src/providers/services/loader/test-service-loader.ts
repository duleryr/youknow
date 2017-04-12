/**
 * @module ServiceLoader
 */ /** */

import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { CustomLogger } from '../../logger';

/**
 * Debug class to try things on the services without modifying other code.
 * This should only be accessible from [[ServiceLoader]].
 */
@Injectable()
export class TestServiceLoader {

  /**
   * @param logger [[CustomLogger]]
   */
  constructor(public logger: CustomLogger) { }

  /**
   * Whatever
   * @param events Whatever
   * @returns {Promise<T>} Whatever
   */
  loadServices(events): Promise<any> {
    this.logger.log('loadServices (testServiceLoader)');
    return new Promise((resolve) => {
      let services = {};
      services['distributeurs'] = {
        onTurnOnDisplay: 'var marker = new google.maps.Marker({\
        map: ctx.map,\
        position: new google.maps.LatLng(45,2)\
      })',
      };
      resolve(services);
    });
  }
}
