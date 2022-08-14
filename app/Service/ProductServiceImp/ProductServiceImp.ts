import { ProductServiceContract } from "@ioc:product/productService";
import * as dtmcli from "dtmcli";

export class ProductServiceImp implements ProductServiceContract {
    // status?: Number | undefined;
    // productId: Number;
    // number: Number;

    // constructor(productId:Number, number: Number) {
    //     this.productId = productId;
    //     this.number = number
    // }

    constructor() {

    }

    public notify (productId, num) {
        console.log('productIds: ', productId)
        console.log('num: ', num)
    }

    public async FireTcc() {
        let dtm = "http://localhost:36789/api/dtmsvr"
        let svc = "http://localhost:3333/order"
        await dtmcli.tccGlobalTransaction(dtm, async (t: dtmcli.Tcc) => {
          let req = { amount: 30 }
          console.log("calling trans out")
          await t.callBranch(req, svc + "/updateStatusTry", svc + "/updateStatusConfirm", svc + "/updateStatusCancel")
        })
    }

    
}