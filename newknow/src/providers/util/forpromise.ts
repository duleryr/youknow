export class ForPromise{

  curr_it: any;
  nb_it: any;
  ref_obj: any;
  res: any;

  constructor(ref_obj: Object, nb_it, res) {
    this.ref_obj = ref_obj;
    this.nb_it = nb_it;
    this.res = res;
    this.curr_it = 0;
  }

  iterate() {
    this.curr_it++;
    if (this.curr_it == this.nb_it) {
      this.res(this.ref_obj);
    }
  }
}
