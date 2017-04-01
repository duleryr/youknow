import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

declare var google: any; 

@Injectable()
export class Autocompletion {

  autoCpltItems: any;
  autoCplt: any;
  acService:any;
  placesService: any;

  constructor() {
  }

  init() {
    this.autoCpltItems = [];
    this.autoCplt = {
      query: ''
    };        
  }
  initGoogleAutocompleteService() {
    this.acService = new google.maps.places.AutocompleteService();        
  }

  chooseItem(item: any) {
    console.log('modal > chooseItem > item > ', item);
  }

  updateSearch() {
    return new Promise ((resolve, reject) => {
      console.log('modal > updateSearch');
      if (this.autoCplt.query == '') {
        this.autoCpltItems = [];
        resolve();
      }
      let self = this;
      let config = { 
        types:  ['geocode'], // other types available in the API: 'establishment', 'regions', and 'cities'
        input: this.autoCplt.query, 
      }
      this.acService.getPlacePredictions(config, function (predictions, status) {
        console.log('modal > getPlacePredictions > status > ', status);
        self.autoCpltItems = [];            
        if (predictions != null) {
          predictions.forEach(function (prediction) {              
            console.log(prediction.description);
            self.autoCpltItems.push(prediction);
          });
          console.log(predictions.length);
        }
        resolve();
      });
    });
  }

}
