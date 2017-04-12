import { Directive, ElementRef, Renderer } from '@angular/core';
import { DomController, Platform } from 'ionic-angular';
import { MapProvider } from '../providers/map/map-provider';
import { Events } from 'ionic-angular';

@Directive({
  selector: '[drag]', // Attribute selector
})
export class DragDirective {
  initX: any;
  initY: any;
  fabRadius: any;

  constructor(public element: ElementRef, public renderer: Renderer, public domCtrl: DomController,
    public events: Events, public mapProvider: MapProvider,
    public plt: Platform) {
    this.fabRadius = 20;
  }

  ngAfterViewInit() {

    this.renderer.setElementStyle(this.element.nativeElement, 'position', 'relative');

    let hammer = new window['Hammer'](this.element.nativeElement);
    hammer.get('pan').set({ direction: window['Hammer'].DIRECTION_ALL });

    hammer.on('pan', (event) => {
      this.handlePan(event);
    });
    hammer.on('panstart', (ev) => {
      console.log('start drag');
      let offset = this.element.nativeElement.getBoundingClientRect();
      this.initX = offset.left;
      this.initY = offset.top - 8;
    });
    hammer.on('panend', (ev) => {
      console.log('end drag');
      let offset = this.element.nativeElement.getBoundingClientRect();
      let lat = this.getLatitude(offset.top);
      let lng = this.getLongitude(offset.left);
      this.events.publish('er:map_event', 'onDragMarkDropped', { 'lat': lat, 'lng': lng });
      this.domCtrl.write(() => {
        this.renderer.setElementStyle(this.element.nativeElement, 'left', this.initX + 'px');
        this.renderer.setElementStyle(this.element.nativeElement, 'top', this.initY + 'px');
        this.renderer.setElementStyle(this.element.nativeElement, 'opacity', '1');
      });
    });

  }

  getLatitude(offsetTop) {
    let startLat = this.mapProvider.map.getBounds().getSouthWest().lat();
    let endLat = this.mapProvider.map.getBounds().getNorthEast().lat();
    return startLat + ((1 - offsetTop * 1.0 / this.plt.height() - 0.023) * (endLat - startLat));
  }
  getLongitude(offsetLeft) {
    let startLng = this.mapProvider.map.getBounds().getSouthWest().lng();
    let endLng = this.mapProvider.map.getBounds().getNorthEast().lng();
    return startLng + ((offsetLeft * 1.0 / this.plt.width() + 0.026) * (endLng - startLng));
  }

  handlePan(ev) {

    this.renderer.setElementStyle(this.element.nativeElement, 'position', 'fixed');

    let newLeft = ev.center.x - this.fabRadius;
    let newTop = ev.center.y - this.fabRadius;

    this.domCtrl.write(() => {
      this.renderer.setElementStyle(this.element.nativeElement, 'opacity', '0.6');
      this.renderer.setElementStyle(this.element.nativeElement, 'left', newLeft + 'px');
      this.renderer.setElementStyle(this.element.nativeElement, 'top', newTop + 'px');
    });

  }

}
