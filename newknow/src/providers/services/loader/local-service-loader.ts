import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {CustomLogger} from "../../logger";
import {Constants} from "../../constants";
import {Util} from "../../util";

@Injectable()
export class LocalServiceLoader {


  constructor(public http: Http, public logger: CustomLogger, public constants: Constants,
              public util: Util) {
  }

  loadServices() : Promise<any> {

    var loadService = function(service_name) : Promise<any> {
      return new Promise((resolve) => {
        console.log("hello from load " + service_name);
        var service = {};
        service["name"] = service_name;
        service["display"] = false;
        resolve(service);
      });
    };

    this.logger.log("loadServices (localServiceLoader)");
    var relativePathToRoot = "../../../../";
    var pathToLocalServices = relativePathToRoot + this.constants.get('localServicesPath');
    return new Promise((resolve) => {
      this.util.readTextFile(pathToLocalServices+'services.json', text => {
        var data = JSON.parse(text);
        var services = {};
        var services_names = data["registered_services"];
        var nb_services = services_names.length;
        var loaded_services = 0;

        for (var i = 0; i < nb_services; i++) {
          loadService(services_names[i]).then((service_data) => {
            services[service_data["name"]] = service_data;
            loaded_services++;
            console.log("loaded " + loaded_services + " of " + nb_services);
            if (loaded_services == nb_services) {
              resolve(services);
            }
          })
        }

      });
    });
  }
}
