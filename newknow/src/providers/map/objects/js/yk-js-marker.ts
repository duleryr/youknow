import { YkMarker } from '../yk/yk-marker';
import { YkJsMap } from './yk-js-map';
import { YkMarkerLabel } from '../yk/yk-marker-label';
import { YkLatLng } from '../yk/yk-lat-lng';

export class YkJsMarker extends YkMarker {

  constructor(cluster, options?) {
    super('js', cluster);
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

  getIcon(): string {
    return this.repr.getIcon();
  }
  setIcon(icon: string) {
    this.repr.setIcon(icon);
  }

  getPosition(): YkLatLng {
    return null;
  }
  setPosition(position: YkLatLng) {

  }

  getLabel(): YkMarkerLabel {
    return null;
  }
  setLabel(label: YkMarkerLabel) {

  }

  setMap(map: YkJsMap) {
    this.map = map;
    this.repr.setMap(this.map);
  }

  getVisible(): boolean {
    return this.cluster.getMarkerVisible(this);
  }

  setVisible(visible: boolean) {
    this.cluster.setMarkerVisible(this, visible);
    if (this.cluster.isVisible() && visible) {
      this.repr.setVisible(true);
    } else if (!visible) {
      this.repr.setVisible(false);
    }
  }

}
