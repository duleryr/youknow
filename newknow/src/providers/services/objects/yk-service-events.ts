/**
 * Runtime data for the service
 */
export class YkServiceEvents {

  /**
   * Dictionary of the events code for the service.
   */
  private _eventsDict;

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
    this._eventsDict = {};
  }

  get(key: string) {
    return this._eventsDict[key];
  }

  set(key: string, value: any) {
    this._eventsDict[key] = value;
  }

  /**
   * Log the events
   */
  log() {
    console.log(this._eventsDict);
  }
}
