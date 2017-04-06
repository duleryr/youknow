/**
 * @module Pages
 */ /** */

import {Component, ElementRef, ViewChild} from '@angular/core';
import {MapProvider} from '../../providers/map/map-provider';
import {EventReceiver} from "../../providers/services/event-receiver";
import {ServiceProvider} from "../../providers/services/service-provider";
import {LocationManager} from "../../providers/location/location-manager";
import {Autocompletion} from '../../providers/map/autocompletion';
import {YkLatLng} from "../../providers/map/objects/yk/yk-lat-lng";
import {AutocompleteItemsPage} from '../autocomplete-items/autocomplete-items';
import {AlertController, Events, Platform, PopoverController} from 'ionic-angular';
import {Diagnostic, Geolocation} from 'ionic-native';


/**
 * Component for the background map and it's top-level buttons (search bar, menu button, ..)
 */
@Component({
  selector: 'map-selector',
  templateUrl: 'map.html'
})
export class MapPage {

  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('searchbar') searchElement;

  searchbarFocused: boolean;
  popoverTriggered: boolean;
  popover: any;

  /**
   * Load the background map, load the services and set-up the event receiver.
   * @param mapProvider Provider handling anything related to the background map
   * @param platform Ionic2 component
   * @param serviceProvider Provider handling anything related to the services
   * @param eventReceiver Provider receiving events fired from anywhere in the application
   * @param autocompletion Provider of a list of places whose names begin by the searchbar input
   * @param popoverCtrl Ionic2 component to show a popover
   * @param events Ionic2 component to do event programmation
   * @param locationManager Provider handling anything related to the location of the user
   * @param alertCtrl Ionic2 component to show an alert
   */
  constructor(public mapProvider: MapProvider,
              public platform: Platform,
              public serviceProvider: ServiceProvider,
              public autocompletion: Autocompletion, 
              public popoverCtrl: PopoverController,
              public eventReceiver: EventReceiver,
              public events: Events,
              public locationManager: LocationManager,
              public alertCtrl: AlertController) {
    this.platform.ready().then(() => {
      this.mapProvider.init(this.mapElement.nativeElement).then(() => {
        eventReceiver.init();
        this.serviceProvider.init();
        this.autocompletion.initGoogleAutocompleteService();
      });
    });
    // Lorsque l'on choisit une localisation, la popover se ferme, elle n'est plus triggered
    this.events.subscribe('location_choosed', obj => {
      this.popoverTriggered = false;
    });
    this.searchbarFocused = false;
  }

  ngOnInit() {
    this.autocompletion.init();
  }

  /* Barre à moitié transparente lorsqu'elle n'a pas le focus */
  getOpacity() {
    if (!this.searchbarFocused) {
      return '0.5';
    }
    return '1';
  }

  /* Appelée lorsque la barre de recherche perd le focus */
  focusLost() {
    this.searchbarFocused = false;
    this.popoverTriggered = false;
  }

  /* Appelée lorsque la barre de recherche gagne le focus */
  focusGot(evt) {
    if (!this.popoverTriggered) {
      this.presentPopover(evt);
      this.popoverTriggered = true;
      setTimeout(() => {
        this.searchElement.setFocus();
      }, 150);
    }
    this.searchbarFocused = true;
    this.autocompletion.updateSearch().then(() => { });
  }

  /* Appelée lorsque l'on écrit dans la barre de recherche */
  updateSearch(evt, searchbar) {
    this.autocompletion.updateSearch().then(() => { });
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

  goToMyLocation() {
    this.locationManager.getLastLocation().then((location) => {
      if (!location.equals(new YkLatLng(45,3))) {
        this.mapProvider.map.setCenter(location);
      }
      Diagnostic.getLocationMode().then((mode) => {
        if (mode == Diagnostic.locationMode.LOCATION_OFF) {
          let confirm = this.alertCtrl.create({
            title: 'Veuillez autoriser l\'accès aux données de localisation',
            buttons: [
              {
                text: 'Annuler',
                handler: () => {
                }
              },
              {
                text: 'Paramètres',
                handler: () => {
                  Diagnostic.switchToLocationSettings();
                }
              }
            ]
          });
          confirm.present();
        } else {
          this.locationManager.getCurrentLocation().then( (location) => {
            this.mapProvider.map.setCenter(location);
          });
        }
      });
    });
  }
}
