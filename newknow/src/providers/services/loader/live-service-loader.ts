/**
 * @module ServiceLoader
 */ /** */

import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {CustomLogger} from "../../logger";

/**
 * Class to load the services on a distant server with the [[loadServices]] method.
 * This should only be accessible from [[ServiceLoader]].
 */
@Injectable()
export class LiveServiceLoader {

  /**
   * @param logger [[CustomLogger]]
   */
  constructor(public logger: CustomLogger) {}

  /**
   * Load the services on a distant server.
   * @param events Specific events to load for the services if they exist
   * @returns {Promise<any>} resolves dictionary containing data for the services.
   */
  loadServices(events) : Promise<any> {
    this.logger.log("LiveServiceLoader : loadServices not yet implemented");
    return Promise.reject("nyi");
  }
}
