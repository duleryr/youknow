import {Component, ElementRef, ViewChild} from '@angular/core';
import {FabContainer, NavController, NavParams} from 'ionic-angular';
import {ServiceFooter} from "../../providers/services/ui/service-footer";

@Component({
  selector: 'page-footer',
  templateUrl: 'footer.html'
})

export class FooterPage {
  activeServiceName: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public footer: ServiceFooter) {
    this.activeServiceName = "";
  }

  getStyle(name) {
    if (name == this.activeServiceName) {
      return "0 0 15px 5px orange";
    }
    return "";
  }
}
