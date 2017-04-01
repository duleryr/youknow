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
      this.execActiveService(event, params);
    });
    this.events.subscribe('er:ui_event', (service, event, params) => {
      this.exec(service, event, params);
    });
  }

  exec(service, event, params) {
    var context = this.contextBuilder.build(service, params);
    if (!('is_init' in service['runtime'])) {
      service['runtime']['is_init'] = true;
      this.executionWrapper.wrap(context, service['event']['onInit']).then((res) => {
        this.executionWrapper.wrap(context, service['event'][event]);
      });
    } else {
      this.executionWrapper.wrap(context, service['event'][event]);
    }
  }
  execActiveService(event, params) {
    var service = this.serviceFooter.getActiveService();
    if (service != null) {
      this.exec(service, event, params);
    }
  }
}
