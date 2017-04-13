import { YkMap } from '../yk/yk-map';

export class YkNativeMap extends YkMap {

  constructor() {
    super('Native');
  }

  // TODO : (+ add argument)
  load(): Promise<any> {
    this.process_undefined();
    return Promise.reject('not implemented');
  }

  // TODO : (+ add argument)
  setOptions() {
    this.process_undefined();
  }

  getBounds() {
    this.process_undefined();
  }

  // TODO : (+ add argument)
  setCenter() {
    this.process_undefined();
  }
}
