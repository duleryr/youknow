import { YkMarker } from './yk-marker';

/**
 *
 */
export class YkMarkerCluster {

  private markers: any;
  private visible: boolean;

  constructor() {
    this.markers = {};
  }

  addMarker(marker) {
    /*this.markers[marker] = {
      visible: marker.getVisible(),
    };*/
  }

  isVisible(): boolean {
    return this.visible;
  }

  getMarkerVisible(marker: YkMarker): boolean {
    // return this.markers[marker]['visible'];
    return false;
  }

  setMarkerVisible(marker: YkMarker, visible: boolean) {
    // this.markers[marker]['visible'] = visible;
  }

  hide() {
    this.visible = false;
  }

  show() {
    this.visible = true;
  }
}
