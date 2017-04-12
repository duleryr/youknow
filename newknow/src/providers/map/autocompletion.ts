import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import 'rxjs/add/operator/map';

declare var google: any;

/**
 * Provider of a list of places whose names begin by the query of the searchbar
 */
@Injectable()
export class Autocompletion {

  /**
   * the list of places this provider is made for getting
   */
  autoCpltItems: any;
  /**
   * dictionary that just contains the query (input of the searchbar)
   */
  autoCplt: any;
  /**
   * the autocomplete service from google maps api
   */
  acService: any;
  /**
   *
   */
  placesService: any;

  /**
   * @param events ionic2 component to receive/send events
   * It is used in order to clean the searchbar when the user click on the name of an autocomplete place
   */
  constructor(public events: Events) {
    this.events.subscribe('location_choosed', obj => {
      this.autoCplt.query = '';
    });
  }

  init() {
    this.autoCpltItems = [];
    this.autoCplt = {
      query: '',
    };
  }
  initGoogleAutocompleteService() {
    this.acService = new google.maps.places.AutocompleteService();
  }

  updateSearch() {
    return new Promise((resolve, reject) => {
      console.log('modal > updateSearch');
      if (this.autoCplt.query === '') {
        this.autoCpltItems = [];
        resolve();
      }
      let self = this;
      let config = {
        types: ['geocode'], // other types available in the API: 'establishment', 'regions', and 'cities'
        input: this.autoCplt.query,
        componentRestrictions: {
          country: 'FR',
        },
      };
      this.acService.getPlacePredictions(config, function (predictions, status) {
        console.log('modal > getPlacePredictions > status > ', status);
        self.autoCpltItems = [];
        if (predictions != null) {
          predictions.forEach(function (prediction) {
            self.autoCpltItems.push(prediction);
          });
        }
        resolve();
      });
    });
  }

}
