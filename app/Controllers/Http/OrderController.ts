// import Database from '@ioc:Adonis/Lucid/Database'
import Order from 'App/Models/Order'
import OrderDetail from 'App/Models/OrderDetail'
// import { tccGlobalTransaction, Tcc} from 'App/Dtm/tcc'
import * as dtmcli from "dtmcli";
//import {tccGlobalTransactionByPerson} from '../../Utils/utils'
// import Cart from 'App/Models/Cart'
import Database from '@ioc:Adonis/Lucid/Database';
// import { tccGlobalTransactionByPerson } from 'App/Utils/utils';
// import { inject } from '@adonisjs/fold'


// @inject(['@ioc:product/productService', 'product/productService'])
export default class OrderController {
    // productService: any
    // constructor(protected service) {
    //     console.log('service1: ',service)
    //     this.productService = service
    // }
    public async create({ request}){
        const { userId, productData, total, address,name, tel} = request.body()
        // new Tcc("http://localhost:8080/api/dtmsvr", userId)
        // tccGlobalTransaction("http://localhost:8080/api/dtmsvr",)
        const orderNo = new Date().getTime() + userId
        console.log('orderNo: ', orderNo)
        const orderObject = await Order.create({
            orderNo,
            orderPrice: total,
            createTime: new Date(),
            userId
        })
        console.log('order: ', orderObject)
        const orderId = orderObject.orderId

        const orderDetails: any= []
        productData.forEach(element => {
            orderDetails.push({
                userId,
                orderId,
                productId: element.productId,
                productNum: element.productNum,
                tel,
                address,
                receiveName: name,
                createTime: new Date()
            })
        });
        await OrderDetail.createMany(orderDetails)
        return {
            status: 200,
            result: {
                orderNo,
                orderId
            }
        }
    }

    public updateStatusTry () {
        console.log('updateStatus try...')
    }

    public updateStatusCancel () {
        console.log('updateStatusCancel...')
        return { result: "Failure" }
    }
    public async updateStatusConfirm({request}) {
        const body = request.body()
        console.log('body: ', body)
        const orderId = body.orderId
        console.log('orderId: ',orderId)
        const status = body.status
        const userId = body.userId
        // const trx = await Database.transaction()
        // try {
        //     await Database.from('order').where('order.orderId', orderId).update({orderStatus: status})

        //     const order = await Database.from('orderDetail').where('orderDetail.orderId', orderId)
        //     const productIds = order.map(item =>item.productId)
        //     console.log('productId order: ', productIds)
        //     // 删除购物车对应商品   delete  in
        //     const user = auth.use('api').user
        //     console.log('user: ', user)
        //     const result = await Database.from('cart').where('userId', user.userId).whereIn('productId', productIds).delete()
        //     trx.commit()
        //     return { result: "SUCCESS" }
            
        // } catch (error) {
        //     trx.rollback()
        //     return { result: "FIALURE" }
        // }
       
        
        if (orderId && userId) {
            const updateResult = await Database.from('order').where('order.orderId', orderId).update({orderStatus: status, updateTime: new Date()})
            console.log('updateResuslt: ', updateResult)
            const order = await Database.from('orderDetail').where('orderDetail.orderId', orderId)
            console.log('order: ', order)
            const productIds = order.map(item =>item.productId)
            console.log('productId : ', productIds)
            // 删除购物车对应商品   delete  in
           
            console.log('user: ', userId)
            
            const result = await Database.from('cart').where('userId', userId).whereIn('productId', productIds).delete()
            console.log('result: ', result)
        }
        return { result: "SUCCESS" }
    }

    // public async updateStatus({productService}) {
    //     console.log('productService123213', productService)
    //     // await this.service.FireTcc()
    // }

    public async fireTcc({request}) {
        const orderId = request.input('orderId')
        const status = request.input('status')
        const userId = request.input('userId')
        const order = await Order.query().select('*').where('orderId', orderId).where('userId', userId).where('orderStatus', 0)
        console.log('order length: ', order.length)
        console.log('order: ', order)
        if (order.length === 1) {
            const products = await Database.from('order').where('order.orderId', orderId).join('orderdetail', 'orderdetail.orderId', '=', 'order.orderId')
            .select(['orderdetail.productId', 'orderdetail.productNum'])
    
            console.log(' userId : ', userId)
            let dtm = "http://localhost:36789/api/dtmsvr"
            let svc = "http://localhost:3333/order"
            let stockSvc = "http://localhost:3334/stock"
            if (userId) {
                await dtmcli.tccGlobalTransaction(dtm, async (t: dtmcli.Tcc) => {
                    let req = { products, amount:30}
                    let statusReq = {orderId, status, userId, amount:30}
                    console.log("calling trans out")
                    await t.callBranch(statusReq, svc + "/updateStatusTry", svc + "/updateStatusConfirm", svc + "/updateStatusCancel")
                    await t.callBranch(req, stockSvc + "/updateStockTry", stockSvc + "/updateStockConfirm", stockSvc + "/updateStockCancel")
                  })
    
                // tccGlobalTransactionByPerson(dtm, (t: dtmcli.Tcc) => {
                //     let req = { products, amount:30}
                //     let statusReq = {orderId, status, userId, amount:30}
                //     console.log("calling trans out")
                //     t.callBranch(statusReq, svc + "/updateStatusTry", svc + "/updateStatusConfirm", svc + "/updateStatusCancel")
                //     t.callBranch(req, stockSvc + "/updateStockTry", stockSvc + "/updateStockConfirm", stockSvc + "/updateStockCancel")
                // }, userId)
                
            }
        }
       
        
    }
}