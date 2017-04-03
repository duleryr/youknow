/**
 * @module ServiceExecution
 */ /** */

import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';

/**
 * Provider used to execute javascript by generating a native javascript 'Function' object.
 * Should only be accessible from [[ExecutionWrapper]].
 */
@Injectable()
export class FunctionWrapper {

  constructor() {}

  /**
   * Executes 'code' with given 'context' as a global 'yk' variable.
   * The code is executed by constructing a javascript 'Function' object
   * @param context Context which is to be accessible from the code.
   * @param code Code to be executed
   * @returns {Promise<boolean>} resolves true
   */
  wrap(context, code: string) : Promise<boolean> {
    return new Promise((resolve) => {
      var wrappedFunction = new Function("yk", code);
      wrappedFunction(context);
      resolve(true);
    });
  }

}
