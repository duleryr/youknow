import {YkLatLng} from "./yk-lat-lng";
import {YkMarkerLabel} from "./yk-marker-label";
import {YkMap} from "./yk-map";

export abstract class YkMarker {

  mode: string;
  map: YkMap = null;
  protected repr: any;
  serviceKey: string;

  constructor(mode, serviceKey) {
    this.mode = mode;
    this.serviceKey = serviceKey;
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

  abstract getIcon(): string;
  abstract setIcon(icon: string);

  abstract getPosition(): YkLatLng;
  abstract setPosition(position: YkLatLng);

  abstract getLabel(): YkMarkerLabel;
  abstract setLabel(label: YkMarkerLabel);

  abstract setMap(map: YkMap);
  getMap() : YkMap {
    return this.map;
  }

  /*// Later
  getAnimation()
  getClickable()
  getCursor()
  getDraggable()
  getMap()  // also native
  getOpacity() // also native
  getPlace()
  getPosition() // also native
  getShape()
  getTitle() // also native
  getVisible()
  getZIndex()

  // Native
  getHashCode()
  getSnippet()
  getRotation()*/

}
