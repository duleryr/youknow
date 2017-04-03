import {Injectable} from '@angular/core';
import {constants} from '../config/config';
import 'rxjs/add/operator/map';

/**
 * Provider used to read the constants defined in config/config.ts
 */
@Injectable()
export class Constants {

  constructor() {}

  /**
   *
   * @param constant_name Name of the entry that should be returned.
   * @returns {any} The constant associated with the entry.
   */
  get(constant_name: string) {
    return constants[constant_name];
  }

}
