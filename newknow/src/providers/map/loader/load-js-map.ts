/**
 * @module MapLoader
 */ /** */

import {Injectable, ElementRef} from '@angular/core';
import 'rxjs/add/operator/map';
import {ConnectivityService} from "../../connectivity-service";
import {LocationManager} from "../../location/location-manager";
import {YkJsMap} from "../objects/js/yk-js-map";
import {MapProvider} from "../map-provider";
import {YkLatLng} from "../objects/yk/yk-lat-lng";

declare var google;

/**
 * Class to load a javascript google map
 * This should only be accessible from [[MapLoader]].
 */
@Injectable()
export class LoadJsMap {

  /**
   * @param connectivityService [[ConnectivityService]] used to know the state of the internet connection
   * @param locationManager [[LocationManager]] used to know the last recorded location of the user to center
   * the map on this location.
   */
  constructor(public connectivityService: ConnectivityService,
              public locationManager: LocationManager) {
  }

  /**
   * Load a javascript google map
   * @param apiKey api key to load the map
   * @param mapElement reference to the DOM object to populate
   * @param mapProvider [[MapProvider]]
   * @returns [[YkJsMap]] as a promise. Rejected if the user is not connected to the internet
   */
  load(apiKey: string, mapElement: ElementRef, mapProvider: MapProvider): Promise<YkJsMap> {

    return new Promise((resolve, reject) => {
      if (typeof google == "undefined" || typeof google.maps == "undefined") {
        if (this.connectivityService.isOnline()) {
          window['mapInit'] = () => {
            this.initMap(mapElement, mapProvider).then((map) => {
              resolve(map);
            });
          };

          let script = document.createElement("script");
          script.id = "googleMaps";
          if (apiKey) {
            script.src = 'http://maps.google.com/maps/api/js?key=' + apiKey + '&libraries=drawing,places&callback=mapInit';
          } else {
            script.src = 'http://maps.google.com/maps/api/js?libraries=drawing,places&callback=mapInit';
          }
          document.body.appendChild(script);
        } else {
          reject("Load js map : Not connected");
        }
      } else {
        if (this.connectivityService.isOnline()) {
          this.initMap(mapElement, mapProvider).then((map) => {
            resolve(map);
          });
        } else {
          reject("Load js map : Not connected");
        }
      }
    });
  }

  /**
   * Populate the map element to be displayed and set up the parameters of the map
   * @param mapElement reference to the DOM object to populate
   * @param mapProvider [[MapProvider]]
   * @returns [[YkJsMap]] as a promise.
   */
  private initMap(mapElement: ElementRef, mapProvider: MapProvider): Promise<YkJsMap> {
    return new Promise((resolve) => {
      this.locationManager.getLastLocation().then((position: YkLatLng) => {
        var latLng = new google.maps.LatLng(position.lat(), position.lng());

        var mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          disableDefaultUI: true
        };

        var ykJsMap = new YkJsMap();
        ykJsMap.load(new google.maps.Map(mapElement, mapOptions), mapProvider).then(() => {
          resolve(ykJsMap);
        });

      });
    });

  }

}
