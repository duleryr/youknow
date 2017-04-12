import { YkLatLng } from './yk-lat-lng';

export class YkLatLngBounds {

  southWest: YkLatLng;
  northEast: YkLatLng;

  constructor(southWest: YkLatLng, northEast: YkLatLng) {
    this.southWest = southWest;
    this.northEast = northEast;
  }

  getNorthEast() {
    return this.northEast;
  }

  getSouthWest() {
    return this.southWest;
  }

  getCenter() {
    return new YkLatLng((this.southWest.lat() + this.northEast.lat()) / 2,
      (this.southWest.lng() + this.northEast.lng()) / 2);
  }

  // TODO later : implémenter autres méthodes latlngbounds

}
