import {Injectable, RestClient} from "~@core";

@Injectable
export class SubwayClient extends RestClient {
  constructor() {
    super('https://js-subway-admin.herokuapp.com/');
  }
}
