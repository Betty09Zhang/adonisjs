import { publishMsg } from '../../Service/mqttSend'

export default class NotifyController {

    public sendStockMsg ({request}) {
        const orders = request.input('orderDetail')
        console.log('orders: ',orders)
        const topic = '/stock/order'
        // const msg = '123456'
        const msg = JSON.stringify(orders)
        publishMsg(topic, msg)
    }

}