import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {LocalStorageProvider} from './local-storage-provider';

/**
 * Provider that manages to store/load data by identified actors
 */

@Injectable()
export class StorageProvider {
  /**
   * Dictionary of all the actors data
   * The key are their names, the values are dictionaries that contain their id, and the weight of their data.
   */
  actorsData: any;

  /**
   *
   * @param localStorage [[LocalStorageProvider]] provider used to load/store data
   */
  constructor(public localStorage: LocalStorageProvider) {
    this.actorsData = {};
  }

  /**
   * Add a new actor
   * @param actor Idf of the actor
   */
  addActor(actor) {
    this.actorsData[actor] = {
      id : 0,
      weight: 0
    };
  }

  /**
   * This fonction return the total weight of all what an actor stored.
   * @param actor Idf of the actor
   */
  getWeight(actor) {
    return this.actorsData[actor].weight;
  }

  /**
   * Getter of data in local storage
   * @param key The key where the wanted value is
   * @param actor Which actor want to get value
   */
  get(key, actor) {
    if (actor in this.actorsData) {
      return new Promise((resolve) => {
        this.localStorage.get(actor + '_' + key).then(data => {
          resolve(data);
        });
      });
    } else {
      return Promise.reject(new Error("Non-identified actor rejected"));
    }
  }

  /**
   * Setter of data in local storage
   * @param key The key where to store the value
   * @param value The value to store
   * @param actor Which actor want to store value
   */
  set(key, value, actor) {
    if (actor in this.actorsData) {
      this.localStorage.set(actor + '_' + key, value).then( () => {
        return Promise.resolve("Success set value");
      });
    } else {
      return Promise.reject(new Error("Non-identified actor rejected"));
    }
  }

  /**
   * Remover of data in local storage
   * @param key The key where the wanted value is
   * @param actor Which actor want to remove value
   */
  remove(key, actor) {
    if (actor in this.actorsData) {
      this.localStorage.remove(actor + '_' + key);
      return Promise.resolve("Success remove value");
    } else {
      return Promise.reject(new Error("Non-identified actor rejected"));
    }
  }
}
