import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {ExecutionWrapper} from "./execution/execution-wrapper";
import {Events} from "ionic-angular";
import {ContextBuilder} from "../context/context-builder";
import {ServiceFooter} from "./ui/service-footer";

@Injectable()
export class EventReceiver {

  services: any;

  constructor(public http: Http, public executionWrapper: ExecutionWrapper,
              public contextBuilder: ContextBuilder, public events: Events,
              public serviceFooter: ServiceFooter) {

  }

  init() {
    console.log("Hello event receiver");
    this.events.subscribe('er:map_event', (event, params) => {
      console.log("received event", event, params);
      this.execActiveService(event, params);
    });
  }

  exec(service, event, params) {
    var context = this.contextBuilder.build(service, params);
    this.executionWrapper.wrap(context, service['event'][event]);
  }
  execActiveService(event, params) {
    var service = this.serviceFooter.getActiveService();
    this.exec(service, event, params);
  }
}
