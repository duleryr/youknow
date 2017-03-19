import { Component, ElementRef, ViewChild } from '@angular/core';
import { MapProvider } from '../../providers/map-provider';
import { NavController, Platform } from 'ionic-angular';
import {ServiceWorker} from "../../providers/services/service-worker";

@Component({
  selector: 'map-selector',
  templateUrl: 'map.html'
})
export class MapPage {

  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;

  constructor(public navCtrl: NavController, public maps: MapProvider,
              public platform: Platform, public serviceWorker: ServiceWorker) {

  }

  ionViewDidLoad() {

    this.platform.ready().then(() => {
      this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement);
    });

  }

  onChange(name) {
    if (this.serviceWorker.services[name]["display"]) {
      this.serviceWorker.turnOnDisplay(name);
    } else {
      this.serviceWorker.turnOffDisplay(name);
    }
  }
}
