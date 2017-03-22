import {YkMap} from "../yk/yk-map";

export class YkJsMap extends YkMap {

  constructor() {
    super("Js");
  }

  load(mapRepr): Promise<any> {
    this.repr = mapRepr;
    return Promise.resolve("ok");
  }


  setOptions(dict) {
    this.repr.setOptions(dict);
  }
}
