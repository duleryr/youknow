import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Autocompletion } from '../../providers/map/autocompletion';

/* Cette page est affichée sous forme de popover, en dessous de la barre de recherche
 * Elle contient la fonction chooseItem, appelée lors d'un clic sur un item, qui renvoit toutes les informations liées à celui-ci 
 */

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
