import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HomePage} from '../home/home';
/*
  Generated class for the Menu page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {
  services: Array<{name: string, activated: boolean, buttons: any, dragMarks: any}>;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.services = [
      {
        name: 'Distributeurs',
        activated: true,
        buttons: [
          {icon :'settings'},
          {icon:'funnel'}],
        dragMarks: []
      },
      {name: 'Pense-bête', activated: true, buttons: [{icon :'settings'}], dragMarks: [{}]},
      {name: 'WifiManager', activated: true, buttons: [{icon :'settings'}, {icon:'funnel'}], dragMarks: [{}]},
      {name: 'WalkOrRun', activated: true, buttons: [{icon :'settings'}], dragMarks: []},
      {name: 'Bars', activated: true, buttons: [{icon :'settings'}, {icon:'funnel'}], dragMarks: []}]

  }

  public homePage: any = HomePage;

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  onChange(name) {
    /*if (this.serviceWorker.services[name]["display"]) {
     this.serviceWorker.turnOnDisplay(name);
     } else {
     this.serviceWorker.turnOffDisplay(name);
     }*/
  }

}
