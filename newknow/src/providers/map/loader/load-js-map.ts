import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {ConnectivityService} from "../../connectivity-service";
import {LocationManager} from "../../location/location-manager";
import {YkJsMap} from "../objects/js/yk-js-map";

declare var google;

@Injectable()
export class LoadJsMap {

  mapInitialised: boolean = false;

  constructor(public http: Http, public connectivityService: ConnectivityService,
              public locationManager: LocationManager) {
  }

  load(apiKey, mapElement): Promise<any> {
    return new Promise((resolve, reject) => {
      if(typeof google == "undefined" || typeof google.maps == "undefined") {
        if(this.connectivityService.isOnline()){
          window['mapInit'] = () => {
            this.initMap(mapElement).then((map) => {
              console.log("Resolve map");
              resolve(map);
            });
          };

          let script = document.createElement("script");
          script.id = "googleMaps";
          if(apiKey){
            script.src = 'http://maps.google.com/maps/api/js?key=' + apiKey + '&libraries=drawing,places&callback=mapInit';
          } else {
            script.src = 'http://maps.google.com/maps/api/js?libraries=drawing,places&callback=mapInit';
          }
          document.body.appendChild(script);
        } else {
          reject("Load js map : Not connected");
        }
      }
      else {
        if(this.connectivityService.isOnline()){
          this.initMap(mapElement).then((map) => {
            console.log("Resolve map");
            resolve(map);
          });
        } else {
          reject("Load js map : Not connected");
        }
      }
    });
  }

  initMap(mapElement): Promise<any> {
    this.mapInitialised = true;
    return new Promise((resolve) => {
      this.locationManager.getLastLocation().then((position) => {
        var latLng = new google.maps.LatLng(position.latitude, position.longitude);

        var mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          disableDefaultUI: true
        };

        var ykJsMap = new YkJsMap();
        ykJsMap.load(new google.maps.Map(mapElement, mapOptions)).then(() => {
          resolve(ykJsMap);
        });

      });
    });

  }

}
