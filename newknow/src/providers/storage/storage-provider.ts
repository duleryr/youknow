import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {LocalStorageProvider} from './local-storage-provider';

/**
 * Provider that manages to store/load data by identified actors
 */

@Injectable()
export class StorageProvider {
  actorsData: any;

  /**
   *
   * @param localStorage [[LocalStorageProvider]] provider used to load/store data
   */
  constructor(public localStorage: LocalStorageProvider) {
    this.actorsData = {};
  }

  addActor(actor) {
    this.actorsData[actor] = {
      weight: 0
    };
  }

  getWeight(actor) {
    return this.actorsData[actor].weight;
  }

  get(key, actor) {
    if (actor in this.actorsData) {
      return new Promise((resolve) => {
        this.localStorage.get(key).then(data => {
          resolve(data);
        });
      });
    } else {
      return Promise.reject(new Error("Non-identified actor rejected"));
    }
  }

  set(key, value, actor) {
    if (actor in this.actorsData) {
      this.localStorage.set(key, value);
      return Promise.resolve("Success set value");
    } else {
      return Promise.reject(new Error("Non-identified actor rejected"));
    }
  }

  remove(key, actor) {
    if (actor in this.actorsData) {
      this.localStorage.remove(key);
      return Promise.resolve("Success remove value");
    } else {
      return Promise.reject(new Error("Non-identified actor rejected"));
    }
  }
}
