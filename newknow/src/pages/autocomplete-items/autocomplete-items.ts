import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Autocompletion } from '../../providers/map/autocompletion';

@Component({
  selector: 'page-autocomplete-items',
  templateUrl: 'autocomplete-items.html'
})
export class AutocompleteItemsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public autocompletion: Autocompletion, public viewCtrl: ViewController) {
              }

  chooseItem(item) {
    this.viewCtrl.dismiss();
  }

}
