import { YkMap } from '../yk/yk-map';

export class YkNativeMap extends YkMap {

  constructor() {
    super('Native');
  }

  load(mapRepr): Promise<any> {
    this.process_undefined();
    return Promise.reject('not implemented');
  }

  setOptions(dict) {
    this.process_undefined();
  }

  getBounds() {
    this.process_undefined();
  }

  setCenter(location) {
    this.process_undefined();
  }
}
