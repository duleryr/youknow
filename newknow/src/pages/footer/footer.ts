import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ServiceFooter} from "../../providers/services/ui/service-footer";

@Component({
  selector: 'page-footer',
  templateUrl: 'footer.html'
})

export class FooterPage {
  lastOpenedFab: any;
  activeServiceName: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public footerService: ServiceFooter) {
    this.lastOpenedFab = null;
    this.activeServiceName = "";
  }

  fabClicked(fab, service, ev) {
    console.log(ev);
    if (this.lastOpenedFab != null) {
      if (fab != this.lastOpenedFab) {
        this.lastOpenedFab.close();
      }
    }
    this.lastOpenedFab = fab;
    this.footerService.setActiveService(service);
  }
  getStyle(name) {
    if (name == this.activeServiceName) {
      return "0 0 15px 5px orange";
    }
    return "";
  }

}
