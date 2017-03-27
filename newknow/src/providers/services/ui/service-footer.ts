import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {CustomLogger} from '../../logger';
@Injectable()
export class ServiceFooter {

  services: any;
  names: any;

  constructor(public http: Http, public logger: CustomLogger) {
    this.services = [
      {
        name: 'Distributeurs',
        icon: 'usd',
        buttons: [
          {icon :'settings'},
          {icon:'funnel'}],
        dragMarks: []
      },
      {name: 'Pense-bête', icon: 'bulb', buttons: [{icon :'settings'}], dragMarks: [{}]},
      {name: 'WifiManager', icon: 'wifi', buttons: [{icon :'settings'}, {icon:'funnel'}], dragMarks: [{}]},
      {name: 'WalkOrRun', icon: 'walk', buttons: [{icon :'settings'}], dragMarks: []},
      {name: 'Bars', icon: 'beer', buttons: [{icon :'settings'}, {icon:'funnel'}], dragMarks: []}]

  }

}
