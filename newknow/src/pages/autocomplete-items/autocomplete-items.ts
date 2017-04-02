import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Autocompletion } from '../../providers/map/autocompletion';

/* Cette page est affichée sous forme de popover, en dessous de la barre de recherche
 * Elle contient la fonction chooseItem, appelée lors d'un clic sur un item, qui renvoit toutes les informations liées à celui-ci 
 */

@Component({
  selector: 'page-autocomplete-items',
  templateUrl: 'autocomplete-items.html'
})
export class AutocompleteItemsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public autocompletion: Autocompletion, public viewCtrl: ViewController) {
  }

  chooseItem(item) {
    console.log(item.description);
    var request = {
      placeId: item.place_id
    }
    console.log(request.placeId);
    this.viewCtrl.dismiss();
    //this.getPlaceDetail(request.placeId);
  }

  /*
  private getPlaceDetail(place_id:string):void {
    var self = this;
    var request = {
      placeId: place_id
    };
    this.placesService = new google.maps.places.PlacesService(this.map);
    this.placesService.getDetails(request, callback);
    function callback(place, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        console.log('page > getPlaceDetail > place > ', place);
        // set full address
        self.placedetails.address = place.formatted_address;
        self.placedetails.lat = place.geometry.location.lat();
        self.placedetails.lng = place.geometry.location.lng();
        for (var i = 0; i < place.address_components.length; i++) {
          let addressType = place.address_components[i].types[0];
          let values = {
            short_name: place.address_components[i]['short_name'],
            long_name: place.address_components[i]['long_name']
          }
          if(self.placedetails.components[addressType]) {
            self.placedetails.components[addressType].set = true;
            self.placedetails.components[addressType].short = place.address_components[i]['short_name'];
            self.placedetails.components[addressType].long = place.address_components[i]['long_name'];
          }                                     
        }                  
        // set place in map
        self.map.setCenter(place.geometry.location);
        self.createMapMarker(place);
        // populate
        self.address.set = true;
        console.log('page > getPlaceDetail > details > ', self.placedetails);
      }else{
        console.log('page > getPlaceDetail > status > ', status);
      }
    }
  }

  private createMapMarker(place:any):void {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: this.map,
      position: placeLoc
    });    
    this.markers.push(marker);
  }
  */
}
