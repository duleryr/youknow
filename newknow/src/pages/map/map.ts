import { Component, ElementRef, ViewChild } from '@angular/core';
import { MapProvider } from '../../providers/map/map-provider';
import { NavController, Platform } from 'ionic-angular';
import { ServiceWorker } from "../../providers/services/service-worker";

@Component({
  selector: 'map-selector',
  templateUrl: 'map.html'
})
export class MapPage {
  services: Array<{name: string, activated: boolean, buttons: any, dragMarks: any}>;

  @ViewChild('map') mapElement: ElementRef;

  constructor(public navCtrl: NavController, public maps: MapProvider,
              public platform: Platform, public serviceWorker: ServiceWorker) {
    this.services = [
      {
        name: 'Distributeurs',
        activated: true,
        buttons: [
          {icon :'settings'},
          {icon:'funnel'}],
        dragMarks: []
      },
      {name: 'Pense-bête', activated: true, buttons: [{icon :'settings'}], dragMarks: [{}]},
      {name: 'WifiManager', activated: true, buttons: [{icon :'settings'}, {icon:'funnel'}], dragMarks: [{}]},
      {name: 'WalkOrRun', activated: true, buttons: [{icon :'settings'}], dragMarks: []},
      {name: 'Bars', activated: true, buttons: [{icon :'settings'}, {icon:'funnel'}], dragMarks: []}]
  }

  ionViewDidLoad() {

    this.platform.ready().then(() => {
      this.maps.init(this.mapElement.nativeElement);
    });

  }

  onChange(name) {
    /*if (this.serviceWorker.services[name]["display"]) {
      this.serviceWorker.turnOnDisplay(name);
    } else {
      this.serviceWorker.turnOffDisplay(name);
    }*/
  }
}
