/**
 * Internal memory of a service
 */
export class YkServiceMemory {

  /**
   * Dictionary of the actual memory used by the service. This class is the owner of this data.
   */
  private _memory_internal_dictionary: any;

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
    this._memory_internal_dictionary = {};
  }

  /**
   * Return [[_memory_internal_dictionary]].
   * @returns {any}
   */
  mem() {
    return this._memory_internal_dictionary;
  }

}

