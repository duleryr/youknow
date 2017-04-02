import { Component, ElementRef, ViewChild } from '@angular/core';
import { MapProvider } from '../../providers/map/map-provider';
import { Autocompletion } from '../../providers/map/autocompletion';
import { AutocompleteItemsPage } from '../autocomplete-items/autocomplete-items';
import { Events, NavController, Platform, PopoverController } from 'ionic-angular';
import { ServiceWorker } from "../../providers/services/service-worker";
import { EventReceiver } from "../../providers/services/event-receiver";

/* Map contient la carte, ainsi que tout ce qui est affiché par dessus, boutons, barre de recherche etc. */

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
              public eventReceiver: EventReceiver, public events: Events) {
    this.platform.ready().then(() => {
      this.maps.init(this.mapElement.nativeElement).then(() => {
        eventReceiver.init();
        this.serviceWorker.init();
        this.autocompletion.initGoogleAutocompleteService();
      });
    });
    // Lorsque l'on choisit une localisation, la popover se ferme, elle n'est plus triggered
    this.events.subscribe('location_choosed', obj => {
      this.popoverTriggered = false;
    });
    this.popoverTriggered = false;
  }

  ngOnInit() {
    this.autocompletion.init();
  }

  /* Appelée lorsque la barre de recherche perd le focus */
  focusLost() {
    this.popoverTriggered = false;
  }

  /* Appelée lorsque la barre de recherche gagne le focus */
  focusGot(evt) {
    this.autocompletion.updateSearch().then(() => {
      if (this.autocompletion.autoCpltItems.length != 0 && !this.popoverTriggered) {
        this.presentPopover(evt);
      }
    });
  }

  /* Appelée lorsque l'on écrit dans la barre de recherche */
  updateSearch(evt, searchbar) {
    this.autocompletion.updateSearch().then(() => {
      if (this.autocompletion.autoCpltItems.length != 0) {
        if (!this.popoverTriggered) {
          this.presentPopover(evt);
          this.popoverTriggered = true;
          // Ligne d'en dessous à améliorer, ngZone ou promise ?
          setTimeout(() => {
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

  /* Affiche la page d'autocompletion sous forme de popover, en dessous de la barre de recherche */
  presentPopover(evt) {
    this.popover = this.popoverCtrl.create(AutocompleteItemsPage, {}, {
      cssClass: 'locations-popover'
    });
    this.popover.present({
      ev: evt
    });
  }
}
