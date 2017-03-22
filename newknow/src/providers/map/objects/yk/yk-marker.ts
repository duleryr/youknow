

export abstract class YkMarker {

  mode: any;
  protected repr: any;

  constructor(mode) {
    this.mode = mode;
  }

  process_undefined() {
    try {
      throw new Error();
    }
    catch (e) {
      console.log("Called an undefined function of YkMarker in mode " + this.mode);
      console.log(e);
    }
  }



}
