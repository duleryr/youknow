import {YkServiceIdentity} from "./yk-service-identity";
import {YkServiceMemory} from "./yk-service-memory";
import {YkServiceRuntime} from "./yk-service-runtime";
import {YkServiceEvents} from "./yk-service-events";
import {YkServiceUi} from "./yk-service-ui";

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

  /**
   * Events code for the service (see [[YkServiceEvent]]).
   */
  private _events: YkServiceEvents;

  /**
   * Ui data for the service (see [[YkServiceUi]]).
   */
  private _ui: YkServiceUi;

  constructor() {
    this._identity = new YkServiceIdentity();
    this._memory = new YkServiceMemory();
    this._runtime = new YkServiceRuntime();
    this._events = new YkServiceEvents();
    this._ui = new YkServiceUi();
  }

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

  /**
   * Get the events code data of the service.
   * @returns {YkServiceEvents}
   */
  events(): YkServiceEvents {
    return this._events;
  }

  /**
   * Get the UI data of the service.
   * @returns {YkServiceUi}
   */
  ui(): YkServiceUi {
    return this._ui;
  }

  /**
   * Log the service
   */
  log() {
    console.log("\nNew service log ___");
    console.log("Service identity :")
    this._identity.log();
    console.log("Service ui :");
    this._ui.log();
    console.log("Service memory");
    this._memory.log();
    console.log("Service runtime");
    this._runtime.log();
    console.log("Service events");
    this._events.log();
    console.log("End service log ___\n");
  }

}

