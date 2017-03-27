import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ServiceFooter} from "../../providers/services/ui/service-footer";

@Component({
  selector: 'page-footer',
  templateUrl: 'footer.html'
})
export class FooterPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public footer: ServiceFooter) {

  }


}
