import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HomePage} from '../home/home';
import {ServiceMenu} from "../../providers/services/ui/service-menu";
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

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public serviceMenu: ServiceMenu) {
  }

  public homePage: any = HomePage;

  onToggle(service) {
    this.serviceMenu.onToggle(service);
  }

}
