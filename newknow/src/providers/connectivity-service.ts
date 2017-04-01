/**____________________________________________________________________
ConnectivityService
 Provides information about the connectivity status

 Public interface :
    - isOnline() :
        true if the device is connected to a network, false otherwise
    - isOffline() :
        true if the device is not connected to a network, false otherwise
 ______________________________________________________________________*/


import { Injectable } from '@angular/core';
import { Network } from 'ionic-native';
import { Platform } from 'ionic-angular';

declare var Connection;

@Injectable()
export class ConnectivityService {

  onDevice: boolean;

  constructor(public platform: Platform){
    this.onDevice = this.platform.is('cordova');
  }

  isOnline(): boolean {
    if(this.onDevice && Network.type){
      return Network.type !== Connection.NONE;
    } else {
      return navigator.onLine;
    }
  }

  isOffline(): boolean {
    return !this.isOnline();
  }
}
