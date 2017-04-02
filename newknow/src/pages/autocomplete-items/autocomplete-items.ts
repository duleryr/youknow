import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Autocompletion } from '../../providers/map/autocompletion';
import { MapProvider } from '../../providers/map/map-provider';

/* Cette page est affichée sous forme de popover, en dessous de la barre de recherche
 * Elle contient la fonction chooseItem, appelée lors d'un clic sur un item, qui renvoit toutes les informations liées à celui-ci 
 */

declare var google: any; 

@Component({
  selector: 'page-autocomplete-items',
  templateUrl: 'autocomplete-items.html'
})
export class AutocompleteItemsPage {
  
  placesService: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public autocompletion: Autocompletion, public viewCtrl: ViewController,
              public mapProv: MapProvider) {
  }

  chooseItem(item) {
    var self = this;
    var request = {
      placeId: item.place_id
    }
    this.placesService = new google.maps.places.PlacesService(this.mapProv.map.repr);
    this.placesService.getDetails(request, callback);
    function callback(place, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        self.mapProv.map.setCenter(place.geometry.location);
      }
    }
    this.viewCtrl.dismiss();
  }

}
