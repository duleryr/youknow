/**
 * @module Pages
 */ /** */

import { Component } from '@angular/core';
import { Events, NavController, NavParams, ViewController } from 'ionic-angular';
import { Autocompletion } from '../../providers/map/autocompletion';
import { MapProvider } from '../../providers/map/map-provider';
import { YkLatLng } from '../../providers/map/objects/yk/yk-lat-lng';

/**
 * Component that is shown above the map as a popover
 * It contains a list of autocompleted places, depending on the input of the searchbar
 */

declare var google: any;

@Component({
  selector: 'page-autocomplete-items',
  templateUrl: 'autocomplete-items.html',
})
export class AutocompleteItemsPage {

  placesService: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public autocompletion: Autocompletion, public viewCtrl: ViewController,
    public mapProv: MapProvider, public events: Events) {
  }

  chooseItem(item) {
    let self = this;
    let request = {
      placeId: item.place_id,
    };
    this.placesService = new google.maps.places.PlacesService(this.mapProv.map.repr);
    this.placesService.getDetails(request, callback);
    function callback(place, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        let placeYklatlng = new YkLatLng(place.geometry.location.lat(), place.geometry.location.lng());
        self.mapProv.map.setCenter(placeYklatlng);
      }
    }
    this.viewCtrl.dismiss();
    this.events.publish('location_choosed', {});
  }

}
