/**
 * @module ServiceLoader
 */ /** */

import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Constants } from '../../constants';
import { TestServiceLoader } from './test-service-loader';
import { LiveServiceLoader } from './live-service-loader';
import { CustomLogger } from '../../logger';
import { LocalServiceLoader } from './local-service-loader';

/**
 * Public interface of the [[ServiceLoader]] module. Called from [[ServiceProvider]].
 * Load the services in memory with the [[load]] method. This method is meant to be called once
 * at the start of the application.
 */
@Injectable()
export class ServiceLoader {

  /**
   * Events that the loader should try to read for the services.
   * They are located in the '/src' directory of the service.
   */
  private eventsToLookFor: any;

  /**
   * @param constants [[Constants]] provider used to know which policy use to load the services.
   * Accepted values are 'test', 'live', and 'local'. The policy is in the 'serviceLoaderPolicy' of
   * [[Constants]].
   * @param testServiceLoader [[TestServiceLoader]] provider, used by the 'test' policy.
   * @param liveServiceLoader [[LiveServiceLoader]] provider, used by the 'live' policy. This is the
   * policy meant to be used in production.
   * @param localServiceLoader [[LocalServiceLoader]] provider, used by the 'local' policy.
   * @param logger [[CustomLogger]]
   */
  constructor(public constants: Constants,
    public testServiceLoader: TestServiceLoader,
    public liveServiceLoader: LiveServiceLoader,
    public localServiceLoader: LocalServiceLoader,
    public logger: CustomLogger) { }

  /**
   * Load the services for the policy defined in the 'serviceLoaderPolicy' entry of [[Constants]].
   * @returns {Promise<any>} Resolves a dictionary containing the services. This is temporary as
   * services will have their own prototype later. Rejects if the policy is
   * unknown or the policy used rejects for any reason.
   */
  loadServices(): Promise<any> {
    this.fillEventsToLoad();
    switch (this.constants.get('serviceLoaderPolicy')) {

      // 'test' policy : testServiceLoader
      case 'test': {
        return this.testServiceLoader.loadServices(this.eventsToLookFor);
      }

      // 'live' policy : liveServiceLoader
      /* falls through */
      case 'live': {
        return this.liveServiceLoader.loadServices(this.eventsToLookFor);
      }

      // 'local' policy : localServiceLoader
      /* falls through */
      case 'local': {
        return this.localServiceLoader.loadServices(this.eventsToLookFor);
      }

      // unknown policy : reject
      /* falls through */
      default: {
        this.logger.log('Unknown policy ' + this.constants.get('serviceLoaderPolicy') +
          ' for serviceLoaderPolicy');
        return Promise.reject('Error in loadServices');
      }
    }
  }

  /**
   * Fill the [[eventsToLookFor]] private member
   */
  private fillEventsToLoad() {
    this.eventsToLookFor = [
      'onTurnOn',
      'onTurnOff',
      'onZoom',
      'onInit',
      'onScroll',
      'onDragMarkDropped',
    ];
  }

}
