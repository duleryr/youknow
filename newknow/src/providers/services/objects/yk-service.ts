import {YkServiceIdentity} from "./yk-service-identity";
import {YkServiceMemory} from "./yk-service-memory";
import {YkServiceRuntime} from "./yk-service-runtime";

/**
 * Class representing a YouKnow service
 */
export class YkService {

  /**
   * Identity of the service (see [[YkServiceIdentity]]).
   */
  private _identity: YkServiceIdentity;

  /**
   * Internal memory of the service (see [[YkServiceMemory]]).
   */
  private _memory: YkServiceMemory;

  /**
   * Runtime data of the service (see [[YkServiceRuntime]]).
   */
  private _runtime: YkServiceRuntime;

  constructor() {}

  /**
   * Get the identity of the service.
   * @returns {YkServiceIdentity}
   */
  identity(): YkServiceIdentity {
    return this._identity;
  }

  /**
   * Get the internal memory of the service.
   * @returns {YkServiceMemory}
   */
  memory(): YkServiceMemory {
    return this._memory;
  }

  /**
   * Get the runtime data of the service.
   * @returns {YkServiceRuntime}
   */
  runtime(): YkServiceRuntime {
    return this._runtime;
  }


}

