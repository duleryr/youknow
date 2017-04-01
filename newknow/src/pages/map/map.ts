import { Component, ElementRef, ViewChild } from '@angular/core';
import { MapProvider } from '../../providers/map/map-provider';
import { Autocompletion } from '../../providers/map/autocompletion';
import { AutocompleteItemsPage } from '../autocomplete-items/autocomplete-items';
import { NavController, Platform, PopoverController } from 'ionic-angular';
import { ServiceWorker } from "../../providers/services/service-worker";
import {EventReceiver} from "../../providers/services/event-receiver";

@Component({
  selector: 'map-selector',
  templateUrl: 'map.html'
})
export class MapPage {

  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('searchbar') searchElement;
  
  popoverTriggered: boolean;
  popover: any;

  constructor(public navCtrl: NavController, public maps: MapProvider,
              public platform: Platform, public serviceWorker: ServiceWorker,
              public autocompletion: Autocompletion, public popoverCtrl: PopoverController,
              public eventReceiver: EventReceiver) {
    this.platform.ready().then(() => {
      this.maps.init(this.mapElement.nativeElement).then(() => {
        eventReceiver.init();
        this.serviceWorker.init();
        this.autocompletion.initGoogleAutocompleteService();
      });
    });
    this.popoverTriggered = false;
  }

  ngOnInit() {
    this.autocompletion.init();
  }

  updateSearch(evt, searchbar) {
    this.autocompletion.updateSearch().then(() => {
      console.log("length : " + this.autocompletion.autoCpltItems.length);
      if (this.autocompletion.autoCpltItems.length != 0) {
        if (!this.popoverTriggered) {
          this.presentPopover(evt);
          this.popoverTriggered = true;
          // Ligne d'en dessous à améliorer, ngZone ou promise ?
          setTimeout(() => {
            console.log(this.searchElement);
            this.searchElement.setFocus();
          }, 100);
        }
      } else {
        console.log("dismiss popover");
        this.popoverTriggered = false;
        this.popover.dismiss();
      }
    });
  }

  presentPopover(evt) {
    this.popover = this.popoverCtrl.create(AutocompleteItemsPage, {}, {
      cssClass: 'locations-popover'
    });
    this.popover.present({
      ev: evt
    });
  }
}
