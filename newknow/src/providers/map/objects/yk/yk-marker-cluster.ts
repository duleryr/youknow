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

  // addMarker(marker: YkMarker) {
  addMarker() {
    /*this.markers[marker] = {
      visible: marker.getVisible(),
    };*/
  }

  isVisible(): boolean {
    return this.visible;
  }

  // getMarkerVisible(marker: YkMarker): boolean {
  getMarkerVisible(): boolean {
    // return this.markers[marker]['visible'];
    return false;
  }

  // setMarkerVisible(marker: YkMarker, visible: boolean) {
  setMarkerVisible() {
    // this.markers[marker]['visible'] = visible;
  }

  hide() {
    this.visible = false;
  }

  show() {
    this.visible = true;
  }
}
