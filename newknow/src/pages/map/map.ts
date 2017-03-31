import { Component, ElementRef, ViewChild } from '@angular/core';
import { MapProvider } from '../../providers/map/map-provider';
import { NavController, Platform } from 'ionic-angular';
import { ServiceWorker } from "../../providers/services/service-worker";
import {EventReceiver} from "../../providers/services/event-receiver";

@Component({
  selector: 'map-selector',
  templateUrl: 'map.html'
})
export class MapPage {

  @ViewChild('map') mapElement: ElementRef;

  constructor(public navCtrl: NavController, public maps: MapProvider,
              public platform: Platform, public serviceWorker: ServiceWorker,
              public eventReceiver: EventReceiver) {
    this.platform.ready().then(() => {
      this.maps.init(this.mapElement.nativeElement).then(() => {
        eventReceiver.init();
        this.serviceWorker.init();
      });
    });

  }


}
