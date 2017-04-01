/**
 * @module Pages
 */ /** */

import { Component, ElementRef, ViewChild } from '@angular/core';
import { MapProvider } from '../../providers/map/map-provider';
import {Platform} from 'ionic-angular';
import {EventReceiver} from "../../providers/services/event-receiver";
import {ServiceProvider} from "../../providers/services/service-provider";

/**
 * Component for the background map and it's top-level buttons (search bar, menu button, ..)
 */
@Component({
  selector: 'map-selector',
  templateUrl: 'map.html'
})
export class MapPage {

  @ViewChild('map') mapElement: ElementRef;

  /**
   * Load the background map, load the services and set-up the event receiver.
   * @param mapProvider Provider handling anything related to the background map
   * @param platform Ionic2 component
   * @param serviceProvider Provider handling anything related to the services
   * @param eventReceiver Provider receiving events fired from anywhere in the application
   */
  constructor(public mapProvider: MapProvider,
              public platform: Platform,
              public serviceProvider: ServiceProvider,
              public eventReceiver: EventReceiver) {
    this.platform.ready().then(() => {
      this.mapProvider.init(this.mapElement.nativeElement).then(() => {
        eventReceiver.init();
        this.serviceProvider.init();
      });
    });

  }


}
