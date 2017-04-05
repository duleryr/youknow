import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Storage} from '@ionic/storage';

/**
 * Provider that implements a tool to store/load data locally
 */

@Injectable()
export class LocalStorageProvider {

  /**
   * @param storage ionic component to store/load data on the device
   */
  constructor(public storage: Storage) {}

  get(key) {
    return new Promise((resolve) => {
      this.storage.get(key).then(data => {
        resolve(data);
      });
    });
  }

  set(key, value) {
    this.storage.set(key, value);
  }

  remove(key) {
    this.storage.remove(key);
  }

}
