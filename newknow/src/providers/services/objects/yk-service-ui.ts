/**
 * Runtime data for the service
 */
export class YkServiceUi {

  /**
   * Dictionary of the ui data for the service.
   */
  private _ui_dict;

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
    this._ui_dict = {};
  }

  get(key: string) {
    return this._ui_dict[key];
  }

  set(key: string, value: any) {
    this._ui_dict[key] = value;
  }

  init(dict) {
    this._ui_dict = dict;
  }

  /**
   * Log the UI data
   */
  log() {
    console.log(this._ui_dict);
  }
}
