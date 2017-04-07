import {YkMarker} from "./yk-marker";
import {YkMapVisibilityManager} from "./yk-map-visibility-manager";
/**
 * Abstract class [[YkMap]] representing the map
 */
export abstract class YkMap {

  mode: any;
  repr: any;
  protected mapProvider: any;
  protected mapVisibilityManager: YkMapVisibilityManager;

  constructor(mode) {
    this.mode = mode;
  }

  process_undefined() {
    try {
      throw new Error();
    }
    catch (e) {
      console.log("Called an undefined function of YkMap in mode " + this.mode);
      console.log(e);
    }
  }

  allow_navigation() {
    this.setOptions({draggable: true, zoomControl: true, scrollwheel: true, disableDoubleClickZoom: false});
  }
  block_navigation() {
    this.setOptions({draggable: false, zoomControl: false, scrollwheel: false, disableDoubleClickZoom: true});
  }

  abstract load(mapRepresentation, mapProvider): Promise<any>;
  abstract setOptions(dict);
  abstract getBounds();

  addMarker(marker: YkMarker) {
    marker.setMap(this);
  }

  abstract setCenter(location);
}
