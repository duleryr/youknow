import { Directive, ElementRef, Renderer } from '@angular/core';
import { DomController } from 'ionic-angular';

@Directive({
  selector: '[drag]' // Attribute selector
})
export class Drag {
  initX: any;
  initY: any;
  fabRadius: any;

  constructor(public element: ElementRef, public renderer: Renderer, public domCtrl: DomController) {
  this.fabRadius = 20;
}

ngAfterViewInit() {

  this.renderer.setElementStyle(this.element.nativeElement, 'position', 'relative');

  let hammer = new window['Hammer'](this.element.nativeElement);
  hammer.get('pan').set({ direction: window['Hammer'].DIRECTION_ALL });

  hammer.on('pan', (ev) => {
    this.handlePan(ev);
  });
  hammer.on('panstart', (ev) => {
    var offset = this.element.nativeElement.getBoundingClientRect();
  //this.initX = ev.center.x - this.fabRadius;
  //this.initY = ev.center.y - this.fabRadius ;
  this.initX = offset.left;
  this.initY = offset.top - 8;
  console.log("X : " + ev.x);
  console.log("Y : " + ev.y);
  console.log("target.X : " + ev.target.x);
  console.log("target.Y : " + ev.target.y);
  console.log("center.X : " + ev.center.x);
  console.log("center.Y : " + ev.center.y);
  console.log("offset.left : " + offset.left);
  console.log("offset.top : " + offset.top);
  console.log("pageX : " + ev.pageX);
  console.log("pageY : " + ev.pageY);
  console.log("deltaX : " + ev.deltaX);
  console.log("deltaY : " + ev.deltaY);
  console.log("clientX : " + ev.clientX);
  console.log("clientY : " + ev.clientY);
  console.log("screenX : " + ev.screenX);
  console.log("screenY : " + ev.screenY);
  console.log("document body scrollLeft : " + document.body.scrollLeft);
  console.log("document body scrollTop : " + document.body.scrollTop);
});
  hammer.on('panend', (ev) => {
    console.log("end");
  this.domCtrl.write(() => {
    this.renderer.setElementStyle(this.element.nativeElement, 'left', this.initX + 'px');
  this.renderer.setElementStyle(this.element.nativeElement, 'top', this.initY + 'px');
});
});

}

  handlePan(ev) {

    this.renderer.setElementStyle(this.element.nativeElement, 'position', 'fixed');

    let newLeft = ev.center.x - this.fabRadius;
    let newTop = ev.center.y - this.fabRadius;

    this.domCtrl.write(() => {
      this.renderer.setElementStyle(this.element.nativeElement, 'left', newLeft + 'px');
      this.renderer.setElementStyle(this.element.nativeElement, 'top', newTop + 'px');
    });

  }

}
