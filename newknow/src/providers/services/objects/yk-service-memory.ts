/**
 * Internal memory of a service
 */
export class YkServiceMemory {

  /**
   * Dictionary of the actual memory used by the service. This class is the owner of this data.
   */
  private _memoryInternalDictionary: any;

  /**
   * Call [[reset]].
   */
  constructor() {
    this.reset();
  }

  /**
   * Empties [[_memory_internal_dictionary]].
   */
  reset() {
    this._memoryInternalDictionary = {};
  }

  /**
   * Return [[_memory_internal_dictionary]].
   * @returns {any}
   */
  mem() {
    return this._memoryInternalDictionary;
  }

  /**
   * Log the memory
   */
  log() {
    console.log(this._memoryInternalDictionary);
  }

}
