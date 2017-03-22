import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {CustomLogger} from "../../logger";

@Injectable()
export class FunctionWrapper {


  constructor(public http: Http, public logger: CustomLogger) {

  }

  wrap(context, code) : Promise<any> {
    return new Promise((resolve) => {
      var wrappedFunction = new Function("yk", code);
      wrappedFunction(context);
      resolve(true);
    });
  }

}
