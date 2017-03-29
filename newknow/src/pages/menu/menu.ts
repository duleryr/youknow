import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HomePage} from '../home/home';
import {ServiceMenu} from "../../providers/services/ui/service-menu";

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
