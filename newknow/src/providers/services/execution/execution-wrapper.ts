import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {CustomLogger} from "../../logger";
import {Constants} from "../../constants";
import {FunctionWrapper} from "./function-wrapper";

@Injectable()
export class ExecutionWrapper {


  constructor(public http: Http, public logger: CustomLogger,
              public constants: Constants, public functionWrapper: FunctionWrapper) {

  }

  wrap(context, code) : Promise<any> {
    switch (this.constants.get('wrapperPolicy')) {
      case "function": {
        return this.functionWrapper.wrap(context, code);
      }
      default: {
        this.logger.log("Unknown policy " + this.constants.get('wrapperPolicy') +
          " for wrapperPolicy");
        return Promise.reject("Error in wrap");
      }
    }
  }

}
