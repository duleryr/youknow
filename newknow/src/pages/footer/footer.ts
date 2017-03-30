import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
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

  fabClicked(fab, service, ev) {
    console.log(ev);
    if (this.openFab != null) {
      this.openFab.close();
      // TODO : Debug
      // if (on ferme celui qui était actif)
      //    mettre this.openFab à null
    }
    this.openFab = fab;
    this.footerService.setActiveService(service);
  }
  getStyle(name) {
    if (name == this.activeServiceName) {
      return "0 0 15px 5px orange";
    }
    return "";
  }

}
