/**
 * Runtime data for the service
 */
export class YkServiceUi {

  /**
   * Dictionary of the ui data for the service.
   */
  private _uiDict;

  /**
   * Call [[reset]].
   */
  constructor() {
    this.reset();
  }

  /**
   * Empties [[_ui_dict]].
   */
  reset() {
    this._uiDict = {};
  }

  get(key: string) {
    return this._uiDict[key];
  }

  set(key: string, value: any) {
    this._uiDict[key] = value;
  }

  init(dict) {
    this._uiDict = dict;
  }

  /**
   * Log the UI data
   */
  log() {
    console.log(this._uiDict);
  }
}
