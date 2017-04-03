import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {YkMap} from "../map/objects/yk/yk-map";

/**
 * Provider in charge of building environment variables available for an execution
 * of a service.
 */
@Injectable()
export class ContextBuilder {

  constructor() {}

  /**
   * Build the object that will be accessible for a given service in it's execution.
   * Called by [[EventReceiver.exec]]
   * @param service Service that is to be executed
   * @param map [[YkMap]] object that the service will be able to manipulate
   * @param parameters Additional parameters that will be accessible for the service
   * @returns Dictionary object with needed fields :
   */
  build(service, map: YkMap, parameters) {
    return {
      /**
       * [[YkMap]] object that the service will be able to manipulate
       */
      map: map,

      /**
       * @float Last recorded latitude of the user
       */
      latitude: 45,

      /**
       * @float Last recorded longitude of the user
       */
      longitude: 2,

      /**
       * @dictionary Live memory of the service
       */
      data: service['memory'],

      /**
       * @dictionary Additional parameters
       */
      params: parameters
    };
  }

}
