/**
 * @module Pages
 */ /** */

import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { ServiceMenu } from '../../providers/services/ui/service-menu';
import { Checkbox } from 'ionic-angular';
import { YkService } from '../../providers/services/objects/yk-service';

/**
 * Component for the left menu. This is the top-level component, which calls [[HomePage]] in a ion-nav tag
 */

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  /**
   * Reference to the page [[HomePage]].
   */
  public homePage: any = HomePage;

  /**
   * @param serviceMenu Provider handling anything happening on this left menu.
   * It also provides data needed for display in the menu.
   */
  constructor(public serviceMenu: ServiceMenu) {
  }

  /**
   * Called when the user checks or un-checks a service in the left menu.
   * Transmits the event to [[ServiceMenu]] by calling [[ServiceMenu.onToggle]]
   * @param service Service toggled by the user
   */
  onToggle(service: YkService, event: Checkbox) {
    this.serviceMenu.onToggle(service, event.checked);
  }

}
