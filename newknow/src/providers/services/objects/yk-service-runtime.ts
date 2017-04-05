/**
 * Runtime data for the service
 */
export class YkServiceRuntime {

  /**
   * Dictionary of the runtime data for the service.
   */
  private _runtime_dict;

  /**
   * Whether the service has run it's initialization code yet or not.
   */
  private _init : boolean = false;

  /**
   * Whether the service is activated (checked on the left menu)
   */
  private _activated : boolean = false;

  /**
   * Call [[reset]].
   */
  constructor() {
    this.reset();
  }

  /**
   * Empties [[_runtime_dict]]. Set [[_init]] to false.
   */
  reset() {
    this._runtime_dict = {};
    this.set_init(false);
  }

  get(key: string) {
    return this._runtime_dict[key];
  }

  set(key: string, value: any) {
    this._runtime_dict[key] = value;
  }

  is_init() : boolean {
    return this._init;
  }

  set_init(bool) {
    this._init = bool;
  }

  is_activated() : boolean {
    return this._activated;
  }

  set_activated(bool) {
    this._activated = bool;
  }

  /**
   * Log the runtime data
   */
  log() {
    console.log("Activated : ", this._activated);
    console.log("Initialized : ", this._init);
    console.log("Other data : ", this._runtime_dict);
  }

}
