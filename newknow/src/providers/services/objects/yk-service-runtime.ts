/**
 * Runtime data for the service
 */
export class YkServiceRuntime {

  /**
   * Dictionary of the runtime data for the service.
   */
  private _runtime_dict;

  /**
   * Call [[reset]].
   */
  constructor() {
    this.reset();
  }

  /**
   * Empties [[_runtime_dict]].
   */
  reset() {
    this._runtime_dict = {};
  }

  get(key: string) {
    return this._runtime_dict[key];
  }

  set(key: string, value: any) {
    this._runtime_dict[key] = value;
  }
}
