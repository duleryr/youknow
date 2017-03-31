import {YkMap} from "../yk/yk-map";
import {YkLatLngBounds} from "../yk/yk-lat-lng-bounds";
import {YkLatLng} from "../yk/yk-lat-lng";
import {Events} from "ionic-angular";

export class YkJsMap extends YkMap {


  constructor() {
    super("Js");
  }

  load(mapRepr, mapProvider): Promise<any> {
    var events = new Events;
    var mapProvider = mapProvider;
    this.repr = mapRepr;
    this.repr.addListener('bounds_changed', function() {
      events.publish('er:map_event', 'bounds_changed', {});
    });
    return Promise.resolve("ok");
  }


  setOptions(dict) {
    this.repr.setOptions(dict);
  }

  getBounds() {
    var jsBounds = this.repr.getBounds();
    if (jsBounds == null) {
      return jsBounds;
    } else {
      var ew = jsBounds.getSouthWest();
      var ne = jsBounds.getNorthEast();
      return new YkLatLngBounds(new YkLatLng(ew.lat(), ew.lng()), new YkLatLng(ne.lat(), ne.lng()));
    }
  }
  addMarker(marker) {

  }
}
