import Database from '@ioc:Adonis/Lucid/Database'
// import OrderDetail from 'App/Models/OrderDetail'
import Order from 'App/Models/Order'

export default class OrderDetailController {
    public async getOrderDetail({request}){
        const orderId = request.input('orderId')
        const order = await Order.query().where('orderId', orderId)
        const orderDetails = await Database.from('orderdetail').where('orderdetail.orderId', orderId)
        .join('product', 'orderdetail.productId', '=', 'product.productId')
        .select('orderdetail.*')
        .select('product.productName')

        return {
            order,
            orderDetails
        }

    }


}