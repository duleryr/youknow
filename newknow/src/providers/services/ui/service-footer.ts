import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
@Injectable()

/**
 * Provider that handles the logic of the footer menu.
 */ /** */
export class ServiceFooter {

  /**
   * Array of services displayed in the footer
   */
  services: any;

  /**
   * Reference to the active service. The active service is the last service that was clicked
   * by the user in the footer.
   */
  activeService: any;

  /**
   * Set the active service to null and the array of services to empty.
   */
  constructor() {
    this.services = [];
    this.activeService = null;
  }

  /**
   * Add a service to the footer menu. Called from [[ServiceMenu]].
   * @param service Reference to the service to be added to the footer
   */
  addService(service) {
    this.services.push(service);
  }

  /**
   * Remove a service from the footer menu. Called from [[ServiceMenu]].
   * @TODO : rewrite not like this (dict structure ? (remove O(log(n)) vs O(n))
   * @param service Reference to the service to be removed from the footer.
   */
  removeService(service) {
    for (let i = 0; i < this.services.length; i++) {
      if (service === this.services[i]) {
        this.services.splice(i, 1);
        break;
      }
    }
  }

  /**
   * Set the active service. Called from [[FooterPage]] when the user clicks the fab button
   * associated with the service.
   * @param service Service that will become active.
   */
  setActiveService(service) {
    this.activeService = service;
  }

  /**
   * Accessor to retrieve the currently active service.
   * @returns {any} A reference to the active service.
   */
  getActiveService() {
    return this.activeService;
  }

  /**
   * True is the service is the active one, false otherwise
   * @param service Service to check
   * @returns {boolean}
   */
  isActive(service) {
    return (service === this.activeService);
  }

}
