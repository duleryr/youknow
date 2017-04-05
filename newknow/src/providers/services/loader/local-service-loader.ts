/**
 * @module ServiceLoader
 */ /** */

import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {CustomLogger} from "../../logger";
import {Constants} from "../../constants";
import {Util} from "../../util/util";
import {ForPromise} from "../../util/forpromise";
import {YkService} from "../objects/yk-service";

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
    this.relativePathToRoot = "../../../../";
    this.pathToLocalServices = this.relativePathToRoot + this.constants.get('localServicesPath');
    this.globalServiceConfig = 'services.json';
    this.individualServiceConfig = 'config.json';
  }

  /**
   * Private method to load a specific service. Called from [[loadServices]]
   * @param service_name Name of the service to be loaded
   * @param events Events to load for the service
   * @returns {Promise<any>} Resolves a dictionary with data for the service.
   * Rejects if the individual service configuration file can't be read properly.
   */
  private loadService(service_name, events) : Promise<any> {
    return new Promise((resolve, reject) => {
      var service = new YkService();
      service.runtime().set("display", false);

      this.util.readTextFile(this.pathToLocalServices+service_name+'/'+this.individualServiceConfig)
      .then( text => {
        var data = JSON.parse(text);

        service.identity().name = data['name'];
        service.identity().description = data['description'];
        service.identity().author = data['author'];
        service.identity().version = data['version'];
        service.ui().init(data['ui']);
        service.runtime().set('is_active', false);

        var forPromise = new ForPromise(service, events.length, resolve);
        var srcPath = this.pathToLocalServices+service_name+'/src/';

        var loadEvent = function(store, name, util) : Promise<any> {
          return new Promise((resolve, reject) => {
            util.readTextFile(srcPath+name+".js").then( (text) => {
              store.set(name, text);
              resolve();
            }).catch( () => {
              reject();
            });
          })
        };

        for (var i = 0; i < events.length; i++) {
          loadEvent(service.events(), events[i], this.util).then( () => {
            forPromise.iterate();
          }).catch( () => {
            forPromise.iterate();
          });
        }

      }).catch( e => {
        reject(new Error("can't load service config for " + service_name));
      });
    });
  };


  /**
   * Load the services on a distant server.
   * @param events Specific events to load for the services if they exist
   * @returns {Promise<any>} resolves dictionary containing data for the services.
   */
  loadServices(events) : Promise<any> {

    this.logger.log("loadServices (localServiceLoader)");

    return new Promise((resolve, reject) => {
      this.util.readTextFile(this.pathToLocalServices+this.globalServiceConfig).then( text => {
        var data = JSON.parse(text);
        var services = {};
        var services_names = data["registered_services"];
        var nb_services = services_names.length;

        var forPromise = new ForPromise(services, nb_services, resolve);

        for (var i = 0; i < nb_services; i++) {
          this.loadService(services_names[i], events)
            .then((service_data) => {
              services[service_data["name"]] = service_data;
              forPromise.iterate();
            }).catch((err) => {
              console.log(err);
              forPromise.iterate();
          });
        }

      }).catch((err) => {
        reject("errload services");
      });
    });
  }
}
