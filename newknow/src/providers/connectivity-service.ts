import { Injectable } from '@angular/core';
import { Network } from 'ionic-native';
import { Platform } from 'ionic-angular';

declare var Connection;

/**
 * Provides information about the connectivity status
 */
@Injectable()
export class ConnectivityService {

  /**
   * Whether the app is running on a mobile or not. True if yes, false otherwise.
   */
  private onDevice: boolean;

  /**
   * Set the private member [[onDevice]]
   * @param platform Ionic2 Platform provider.
   */
  constructor(public platform: Platform){
    this.onDevice = this.platform.is('cordova');
  }

  /**
   * @returns {boolean} True if the device is connected to a network, false otherwhise
   */
  isOnline(): boolean {
    if(this.onDevice && Network.type){
      return Network.type !== Connection.NONE;
    } else {
      return navigator.onLine;
    }
  }

  /**
   * @returns {boolean} True if the device is not connected to a network, false otherwhise
   */
  isOffline(): boolean {
    if(this.onDevice && Network.type){
      return Network.type === Connection.NONE;
    } else {
      return !navigator.onLine;
    }
  }
}
