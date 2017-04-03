/**
 * @module Pages
 */ /** */

import {Component} from '@angular/core';
import {ServiceFooter} from "../../providers/services/ui/service-footer";

/**
 * Component for the footer of the main page.
 * This footer displays Fab Buttons of activated services and enables the user to interact with these.
 */
@Component({
  selector: 'page-footer',
  templateUrl: 'footer.html'
})
export class FooterPage {
  /**
  * Last fab button that was clicked by the user.
  */
  lastOpenedFab: any;

  /**
   * @param serviceFooter Provider for this page, see [[ServiceFooter]]
   */
  constructor(public serviceFooter: ServiceFooter) {
    this.lastOpenedFab = null;
  }

  /**
   * Called by the view 'footer.html' when a FabButton is clicked by the user.
   * Close the [[lastOpenedFab]], set it's value and notify the [[serviceFooter]] provider
   * @param fab FabButton object that was clicked
   * @param service service associated with the FabButton
   */
  onFabClicked(fab, service) {
    if (this.lastOpenedFab != null) {
      if (fab != this.lastOpenedFab) {
        this.lastOpenedFab.close();
      }
    }
    this.lastOpenedFab = fab;
    this.serviceFooter.setActiveService(service);
  }
}
