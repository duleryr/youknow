import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { MapPage } from '../pages/map/map';
import { ConnectivityService } from '../providers/connectivity-service';
import {MapProvider} from "../providers/map-provider";
import {ServiceProvider} from "../providers/service-provider";

@NgModule({
  declarations: [
    MyApp,
    MapPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MapPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
    ConnectivityService, MapProvider, ServiceProvider]
})
export class AppModule {}

