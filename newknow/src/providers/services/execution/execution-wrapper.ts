/**
 * @module ServiceExecution
 */ /** */

import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { CustomLogger } from '../../logger';
import { Constants } from '../../constants';
import { FunctionWrapper } from './function-wrapper';

/**
 * Provider used to execute any javascript code for a service with the [[wrap]] method.
 * Called from [[EventReceiver]].
 */
@Injectable()
export class ExecutionWrapper {

  /**
   *
   * @param logger [[CustomLogger]] provider
   * @param constants [[Constants]] provider used to know which policy use for the wrapper.
   * @param functionWrapper [[FunctionWrapper]] provider used for the 'function' wrapper policy
   */
  constructor(public logger: CustomLogger, public constants: Constants,
    public functionWrapper: FunctionWrapper) { }

  /**
   * Executes 'code' with given 'context'.
   * The policy to be used is in the field 'wrapperPolicy' of [[Constants]].
   * Accepted value is : 'function' ([[FunctionWrapper]]).
   * @param context Context which is to be accessible from the code
   * @param code Code to be executed
   * @returns {Promise<boolean>} resolves true if the wrapper was successful, rejects otherwise
   */
  wrap(context, code: string): Promise<boolean> {
    switch (this.constants.get('wrapperPolicy')) {
      case 'function': {
        return this.functionWrapper.wrap(context, code);
      }
      /* falls through */
      default: {
        this.logger.log('Unknown policy ' + this.constants.get('wrapperPolicy') +
          ' for wrapperPolicy');
        return Promise.reject('Error in wrap');
      }
    }
  }

}
