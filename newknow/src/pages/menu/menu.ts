/**
 * @module Pages
 */ /** */

import { Component } from '@angular/core';
import {HomePage} from '../home/home';
import {ServiceMenu} from "../../providers/services/ui/service-menu";

/**
 * Component for the left menu. This is the top-level component, which calls [[HomePage]] in a ion-nav tag
 */

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {

  /**
   * @param serviceMenu Provider handling anything happening on this left menu.
   * It also provides data needed for display in the menu.
   */
  constructor(public serviceMenu: ServiceMenu) {
  }

  /**
   * Reference to the page [[HomePage]].
   */
  public homePage: any = HomePage;

  /**
   * Called when the user checks or un-checks a service in the left menu.
   * The checkbox is related to the field 'activated' of the service.
   * Transmits the event to [[ServiceMenu]] by calling [[ServiceMenu.onToggle]]
   * @param service Service toggled by the user
   */
  onToggle(service) {
    this.serviceMenu.onToggle(service);
  }

}
