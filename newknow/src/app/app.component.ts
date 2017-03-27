import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import {MenuPage} from "../pages/menu/menu";

declare var process;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = MenuPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
