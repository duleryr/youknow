import { YkLatLng } from './yk-lat-lng';
import { YkMarkerLabel } from './yk-marker-label';
import { YkMap } from './yk-map';
import { YkMarkerCluster } from './yk-marker-cluster';

export abstract class YkMarker {

  mode: string;
  map: YkMap = null;
  protected repr: any;
  protected cluster: YkMarkerCluster;

  constructor(cluster, mode) {
    this.mode = mode;
    this.cluster = cluster;
  }

  process_undefined() {
    try {
      throw new Error();
    }
    catch (e) {
      console.log('Called an undefined function of YkMarker in mode ' + this.mode);
      console.log(e);
    }
  }

  abstract getIcon(): string;
  abstract setIcon(icon: string);

  abstract getPosition(): YkLatLng;
  abstract setPosition(position: YkLatLng);

  abstract getLabel(): YkMarkerLabel;
  abstract setLabel(label: YkMarkerLabel);

  abstract getVisible(): boolean;
  abstract setVisible(visible: boolean);

  abstract setMap(map: YkMap);
  getMap(): YkMap {
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

  getZIndex()

  // Native
  getHashCode()
  getSnippet()
  getRotation()*/

}
