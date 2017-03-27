import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Footer page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-footer',
  templateUrl: 'footer.html'
})
export class FooterPage {

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

  ionViewDidLoad() {
    console.log('ionViewDidLoad FooterPage');
  }

}
