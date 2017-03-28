import {Component, ElementRef, ViewChild} from '@angular/core';
import {FabContainer, NavController, NavParams} from 'ionic-angular';
import {ServiceFooter} from "../../providers/services/ui/service-footer";

@Component({
  selector: 'page-footer',
  templateUrl: 'footer.html'
})

export class FooterPage {
  openFab: any;
  activeServiceName: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public footerService: ServiceFooter) {
    this.openFab = null;
    this.activeServiceName = "";
  }

  fabClicked(fab) {
    if (this.openFab != null) {
      this.openFab.close();
    }
    this.openFab = fab;
  }
  getStyle(name) {
    if (name == this.activeServiceName) {
      return "0 0 15px 5px orange";
    }
    return "";
  }

}
