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

  /**
   * Getter of data in local storage
   * @param key The key where to find the value
   */
  get(key) {
    return new Promise((resolve) => {
      this.storage.get(key).then(data => {
        resolve(data);
      });
    });
  }

  /**
   * Setter of data in local storage
   * @param key The key where to store the value
   * @param value The value you want to store
   */
  set(key, value) {
    return new Promise((resolve) => {
      this.storage.set(key, value).then( () => {
        resolve();
      });
    });
  }

  /**
   * Remover of data in local storage
   * @param key The key where to find the value
   */
  remove(key) {
    this.storage.remove(key);
  }

}
