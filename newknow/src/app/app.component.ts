import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { MapPage } from '../pages/map/map';

declare var process;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = MapPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
