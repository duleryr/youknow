import { Component, ElementRef, ViewChild } from '@angular/core';
import { MapProvider } from '../../providers/map-provider';
import { NavController, Platform } from 'ionic-angular';
import {ServiceProvider} from "../../providers/service-provider";

@Component({
  selector: 'map-selector',
  templateUrl: 'map.html'
})
export class MapPage {

  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;

  constructor(public navCtrl: NavController, public maps: MapProvider,
              public platform: Platform, public serviceProvider: ServiceProvider) {

  }

  ionViewDidLoad() {

    this.platform.ready().then(() => {
      let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement);
    });

  }

  onChange(name) {
    if (this.serviceProvider.services[name]["display"]) {
      this.serviceProvider.turnOnDisplay(name);
    } else {
      this.serviceProvider.turnOffDisplay(name);
    }
  }
}
