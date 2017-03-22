import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {CustomLogger} from "../../logger";
import {Constants} from "../../constants";
import {Util} from "../../util/util";
import {ForPromise} from "../../util/forpromise";

@Injectable()
export class LocalServiceLoader {

  relativePathToRoot: any;
  pathToLocalServices: any;
  globalServiceConfig: any;
  individialServiceConfig: any;

  constructor(public http: Http, public logger: CustomLogger, public constants: Constants,
              public util: Util) {
    this.relativePathToRoot = "../../../../";
    this.pathToLocalServices = this.relativePathToRoot + this.constants.get('localServicesPath');
    this.globalServiceConfig = 'services.json';
    this.individialServiceConfig = 'config.json';
  }

  loadService(service_name, events) : Promise<any> {
    return new Promise((resolve, reject) => {
      var service = {};
      service["display"] = false;

      this.util.readTextFile(this.pathToLocalServices+service_name+'/'+this.individialServiceConfig)
        .then( text => {
        var data = JSON.parse(text);
        service['name'] = data['name'];
        service['description'] = data['description'];
        service['author'] = data['author'];
        service['version'] = data['version'];
        service['memory'] = {};
        service['event'] = {};

        var forPromise = new ForPromise(service, events.length, resolve);
        var srcPath = this.pathToLocalServices+service_name+'/src/';

        var loadEvent = function(store, name, util) : Promise<any> {
          return new Promise((resolve, reject) => {
            util.readTextFile(srcPath+name+".js").then( (text) => {
              store[name] = text;
              resolve();
            }).catch( () => {
              reject();
            });
          })
        };

        for (var i = 0; i < events.length; i++) {
          loadEvent(service['event'], events[i], this.util).then( () => {
            forPromise.iterate();
          }).catch( () => {
            forPromise.iterate();
          });
        }

      }).catch( e => {
        console.log("in err first", e);
        reject(new Error("can't load service config for " + service_name));
      });
    });
  };

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
