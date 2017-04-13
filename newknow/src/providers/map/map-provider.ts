import { Injectable } from '@angular/core';
import { MenuController } from 'ionic-angular';
import { MapLoader } from './loader/map-loader';
import { Events } from 'ionic-angular';

@Injectable()
export class MapProvider {

  mapElement: any;
  map: any;
  apiKey: string = 'AIzaSyBo1HeIZ8Fbin5J6c4qId4D5c8JzOpX1HI';

  constructor(public menuController: MenuController,
    public mapLoader: MapLoader, public events: Events) { }

  init(mapElement: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.mapElement = mapElement;
      this.mapLoader.load(this.apiKey, this.mapElement, this).then((map) => {
        this.map = map;
        this.disableScrollWhenMenuOpen();
        resolve();
      }).catch(() => {
        reject();
      });
    });
  }

  private disableScrollWhenMenuOpen() {
    let menu = this.menuController.get('left');
    if (menu) {
      menu.ionDrag.subscribe(() => {
        this.map.block_navigation();
      });
      menu.ionClose.subscribe(() => {
        this.map.allow_navigation();
      });
    }
  }

}
