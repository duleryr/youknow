export class ForPromise {

  currIt: any;
  nbIt: any;
  refObj: any;
  res: any;

  constructor(refObj: Object, nbIt, res) {
    this.refObj = refObj;
    this.nbIt = nbIt;
    this.res = res;
    this.currIt = 0;
  }

  iterate() {
    this.currIt++;
    if (this.currIt === this.nbIt) {
      this.res(this.refObj);
    }
  }
}
