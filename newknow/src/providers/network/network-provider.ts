/**
 * @module Network
 */ /** */

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * [[NetworkProvider]] : Any non-service request from the application goes through this provider
 */
@Injectable()
export class NetworkProvider {

  /**
   *
   * @param http @angular/http provider
   */
  constructor(public http: Http) { }

}
