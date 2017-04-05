/**
 * Runtime data for the service
 */
export class YkServiceEvents {

  /**
   * Dictionary of the events code for the service.
   */
  private _events_dict;

  /**
   * Call [[reset]].
   */
  constructor() {
    this.reset();
  }

  /**
   * Empties [[_events_dict]].
   */
  reset() {
    this._events_dict = {};
  }

  get(key: string) {
    return this._events_dict[key];
  }

  set(key: string, value: any) {
    this._events_dict[key] = value;
  }
}
