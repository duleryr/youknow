/**
 * @module ServiceLoader
 */ /** */

import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { CustomLogger } from '../../logger';
import { Constants } from '../../constants';
import { Util } from '../../util/util';
import { ForPromise } from '../../util/forpromise';
import { YkService } from '../objects/yk-service';

/**
 * Class to load the services on the local file system with the [[loadServices]] method.
 * This should only be accessible from [[ServiceLoader]].
 */
@Injectable()
export class LocalServiceLoader {

  /**
   * Path from this file to the root of the project.
   */
  private relativePathToRoot: string;

  /**
   * Path from the root of the project to the directory where services are stored.
   */
  private pathToLocalServices: string;

  /**
   * Filename of the json file indexing the services.
   */
  private globalServiceConfig: string;

  /**
   * Filename of the json file used by the services to configure themselves.
   */
  private individualServiceConfig: string;

  /**
   * Initializes variables [[relativePathToRoot]], [[pathToLocalServices]], [[globalServiceConfig]],
   * [[individualServiceConfig]].
   * @param logger [[CustomLogger]]
   * @param constants [[Constants]] provider used to know where the services are stored with the
   * 'localServicesPath' entry.
   * @param util [[Util]] provider used to read the files in the local file system.
   */
  constructor(public logger: CustomLogger, public constants: Constants,
    public util: Util) {
    this.relativePathToRoot = '../../../../';
    this.pathToLocalServices = this.relativePathToRoot + this.constants.get('localServicesPath');
    this.globalServiceConfig = 'services.json';
    this.individualServiceConfig = 'config.json';
  }

  /**
   * Load the services on a distant server.
   * @param events Specific events to load for the services if they exist
   * @returns {Promise<any>} resolves dictionary containing data for the services.
   */
  loadServices(events): Promise<any> {

    this.logger.log('loadServices (localServiceLoader)');

    return new Promise((resolve, reject) => {
      this.util.readTextFile(this.pathToLocalServices + this.globalServiceConfig).then(text => {
        let data = JSON.parse(text);
        let services = {};
        let servicesNames = data['registered_services'];
        let nbServices = servicesNames.length;

        let forPromise = new ForPromise(services, nbServices, resolve);

        for (let i = 0; i < nbServices; i++) {
          this.loadService(servicesNames[i], events)
            .then((serviceData) => {
              services[serviceData.identity().name] = serviceData;
              forPromise.iterate();
            }).catch((err) => {
              console.log(err);
              forPromise.iterate();
            });
        }

      }).catch((err) => {
        reject('errload services');
      });
    });
  }

  /**
   * Private method to load a specific service. Called from [[loadServices]]
   * @param service_name Name of the service to be loaded
   * @param events Events to load for the service
   * @returns {Promise<any>} Resolves a dictionary with data for the service.
   * Rejects if the individual service configuration file can't be read properly.
   */
  private loadService(serviceName, events): Promise<any> {
    return new Promise((resolve, reject) => {
      let service = new YkService();
      service.runtime().set('display', false);

      this.util.readTextFile(this.pathToLocalServices + serviceName + '/' + this.individualServiceConfig)
        .then(text => {
          let data = JSON.parse(text);

          service.identity().name = data['name'];
          service.identity().description = data['description'];
          service.identity().author = data['author'];
          service.identity().version = data['version'];
          service.ui().init(data['ui']);
          service.runtime().set('is_active', false);

          let forPromise = new ForPromise(service, events.length, resolve);
          let srcPath = this.pathToLocalServices + serviceName + '/src/';

          let loadEvent = function (store, name, util): Promise<any> {
            return new Promise((resolve, reject) => {
              util.readTextFile(srcPath + name + '.js').then((textBis) => {
                store.set(name, textBis);
                resolve();
              }).catch(() => {
                reject();
              });
            });
          };

          for (let i = 0; i < events.length; i++) {
            loadEvent(service.events(), events[i], this.util).then(() => {
              forPromise.iterate();
            }).catch(() => {
              forPromise.iterate();
            });
          }

        }).catch(e => {
          reject(new Error('can\'t load service config for ' + serviceName));
        });
    });
  };
}
