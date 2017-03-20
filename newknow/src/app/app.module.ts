import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { MapPage } from '../pages/map/map';
import { ConnectivityService } from '../providers/connectivity-service';
import {MapProvider} from "../providers/map-provider";
import {ServiceWorker} from "../providers/services/service-worker";
import {Constants} from "../providers/constants";
import {NetworkProvider} from "../providers/network/network-provider";
import {StorageProvider} from "../providers/storage/storage-provider";
import {LocalStorageProvider} from "../providers/storage/local-storage-provider";
import {ServiceLoader} from "../providers/services/loader/service-loader";
import {TestServiceLoader} from "../providers/services/loader/test-service-loader";
import {LiveServiceLoader} from "../providers/services/loader/live-service-loader";
import {CustomLogger} from "../providers/logger";
import {ExecutionWrapper} from "../providers/services/execution/execution-wrapper";
import {FunctionWrapper} from "../providers/services/execution/function-wrapper";
import {LocalServiceLoader} from "../providers/services/loader/local-service-loader";

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
    ConnectivityService, MapProvider, ServiceWorker, Constants,
    NetworkProvider, StorageProvider, LocalStorageProvider, ServiceLoader,
    TestServiceLoader, LiveServiceLoader, CustomLogger, ExecutionWrapper,
    FunctionWrapper, LocalServiceLoader]
})
export class AppModule {}

