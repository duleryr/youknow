import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { ExecutionWrapper } from './execution/execution-wrapper';
import { Events } from 'ionic-angular';
import { ContextBuilder } from '../context/context-builder';
import { ServiceFooter } from './ui/service-footer';
import { MapProvider } from '../map/map-provider';

/**
 * Provider receiving all events that should get a treatment from one or several services.
 */
@Injectable()
export class EventReceiver {

  /**
   * Receiver code used to identify this event receiver. All events sent to this receiver must be prefixed
   * with this identifier. See [[init]] method for more details.
   * @type {string}
   */
  private RECEIVER_CODE: string = 'er';

  /**
   *
   * @param executionWrapper [[ExecutionWrapper]] provider.
   * @param contextBuilder [[ContextBuilder]] provider used to build the context that will be given to
   * the service.
   * @param events Ionic2 events.
   * @param serviceFooter [[ServiceFooter]] used to retrieve the active service.
   * @param mapProvider [[MapProvider]] used to retrieve the map.
   */
  constructor(public executionWrapper: ExecutionWrapper,
    public contextBuilder: ContextBuilder, public events: Events,
    public serviceFooter: ServiceFooter, public mapProvider: MapProvider) { }

  /**
   * Subscribe to all events this provider is supposed to react. Event names respect the pattern
   * '<RECEIVER_CODE>:<EVENT_NAME>', and can have any number of additional parameters.
   * The <RECEIVER_CODE> for [[EventReceiver]] is 'er'. Subscribed events are :
   *
   * - 'map_event' : This event is emitted by the background map when the user interacts with it.
   *
   * - 'ui_event' : This event is emitted by the YouKnow user interface (left menu, footer, other buttons, ...)
   *
   * Called from [[MapPage]]
   */
  init() {

    // 'map_event'
    this.events.subscribe(this.RECEIVER_CODE + ':map_event', (event, params) => {
      for (let i = 0; i < this.serviceFooter.services.length; i++) {
        this.exec(this.serviceFooter.services[i], event, params);
      }
    });

    // 'ui_event'
    this.events.subscribe(this.RECEIVER_CODE + ':ui_event', (service, event, params) => {
      this.exec(service, event, params);
    });
  }

  /**
   * Execute the code of a service when an event happens. Execute before the 'onInit' event
   * it this is the first time the service is called.
   * @param service Service that is to be executed.
   * @param event Event that the service should react to.
   * @param params Additional parameters that will be given to the service.
   */
  exec(service, event, params) {
    let context = this.contextBuilder.build(service, this.mapProvider.map, params);
    if (!service.runtime().is_init()) {
      service.runtime().set_init(true);
      this.executionWrapper.wrap(context, service.events().get('onInit')).then((res) => {
        this.executionWrapper.wrap(context, service.events().get(event));
      });
    } else {
      this.executionWrapper.wrap(context, service.events().get(event));
    }
  }

  /**
   * Call [[exec]] on the active service of the footer
   * @param event Event that the service should react to.
   * @param params Additional parameters that will be given to the service.
   */
  execActiveService(event, params) {
    let service = this.serviceFooter.getActiveService();
    if (service != null) {
      this.exec(service, event, params);
    }
  }
}
