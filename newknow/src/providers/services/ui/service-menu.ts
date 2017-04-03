import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {ServiceFooter} from "./service-footer";
import {Events} from "ionic-angular";

/**
 * Provider that handles the logic of the left menu.
 */ /** */
@Injectable()
export class ServiceMenu {

  /**
   * Array of services displayed in the left menu.
   */
  services: any;

  /**
   * Set the array of displayed services to empty.
   * @param serviceFooter [[ServiceFooter]] provider called to push/remove services in the footer.
   * @param events Ionic2 events used to push events to [[EventReceiver]].
   */
  constructor(public serviceFooter: ServiceFooter, public events: Events) {
    this.services = [];
  }

  /**
   * Add a service to the left menu.
   * @param service Reference to the service to be added.
   * @param isActivated Boolean : true is the service should be checked by default, false otherwise
   */
  addService(service, isActivated: boolean) {
    var service_menu_data = service;
    service_menu_data['activated'] = isActivated;
    this.services.push(service_menu_data);
  }

  /**
   * React to the click on a service by the user on the left menu.
   * Calls [[turnOnDisplay]] or [[turnOffDisplay]] depending on the state of the checkbox.
   * Called from the view of [[MenuPage]].
   * @param service
   */
  onToggle(service) {
    if (service['activated']) {
      this.turnOnDisplay(service);
    } else {
      this.turnOffDisplay(service);
    }
  }

  /**
   * Add a service to the footer menu. Publish an event 'er:ui_event' with a parameter
   * 'onTurnOn' to [[EventReceiver]].
   * @param service Service to be turned on
   */
  turnOnDisplay(service) {
    this.serviceFooter.addService(service);
    this.events.publish('er:ui_event', service, 'onTurnOn', {});
  }

  /**
   * Remove a service from the footer menu. Publish an event 'er:ui_event' with a parameter
   * 'onTurnOff' to [[EventReceiver]].
   * @param service Service to be turned off
   */
  turnOffDisplay(service) {
    this.serviceFooter.removeService(service);
    this.events.publish('er:ui_event', service, 'onTurnOff', {});
  }

}
