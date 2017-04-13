import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { ServiceLoader } from './loader/service-loader';
import { ServiceMenu } from './ui/service-menu';

@Injectable()
export class ServiceProvider {

  /**
   * Dictionary (?) of all the services. Owner of this data
   */
  services: any;

  /**
   *
   * @param serviceLoader [[ServiceLoader]] provider used to load the services.
   * @param serviceMenu [[ServiceMenu]] provider used to add the services to the left menu.
   */
  constructor(public serviceLoader: ServiceLoader, public serviceMenu: ServiceMenu) { }

  /**
   * Load the services and add them to the left menu. Called from [[MapPage]].
   */
  init() {
    this.services = {};
    this.serviceLoader.loadServices().then(services => {
      this.services = services;
      console.log('Services loaded');
      for (let name in this.services) {
        if (this.services.hasOwnProperty(name)) {
          this.services[name].log();
          this.serviceMenu.addService(this.services[name], false);
        }
      }
    });
  }

}
