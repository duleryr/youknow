import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {ServiceLoader} from "./loader/service-loader";
import {CustomLogger} from "../logger";
import {ServiceMenu} from "./ui/service-menu";

@Injectable()
export class ServiceProvider {

  services: any;

  constructor(public http: Http, public serviceLoader: ServiceLoader, public logger: CustomLogger,
              public serviceMenu: ServiceMenu) {

  }

  init() {
    this.services = {};
    this.serviceLoader.loadServices().then(services => {
      this.services = services;
      for (var name in services) {
        this.serviceMenu.addService(this.services[name], false);
      }
    })
  }







}
