

export class YkLatLng {

  private _lat: any;
  private _lng: any;

  constructor(lat, lng) {
    this._lat = lat;
    this._lng = lng;
  }

  lat() {
    return this._lat;
  }

  lng() {
    return this._lng;
  }

  equals(latLng) {
    return (this._lat == latLng.lat() && this._lng == latLng.lng());
  }

  toString() {
    return "(lat: "+this._lat+",lng: "+this._lng+")";
  }

  toUrlValue() {
    return this._lat+","+this._lng;
  }


}
