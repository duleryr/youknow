import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ServiceFooter} from "../../providers/services/ui/service-footer";

@Component({
  selector: 'page-footer',
  templateUrl: 'footer.html'
})
export class FooterPage {
  openFab: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public footerService: ServiceFooter) {
    this.openFab = null;
  }

  fabClicked(fab) {
    if (this.openFab != null) {
      this.openFab.close();
    }
    this.openFab = fab;
  }

}
