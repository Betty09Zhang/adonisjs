import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import CamelCaseNamingStrategy from './CamelCaseNamingStrategy'
BaseModel.namingStrategy = new CamelCaseNamingStrategy()
export default class Order extends BaseModel {

    public static get table() {
        return 'Order'
    }

    @column({ isPrimary: true, serializeAs: 'orderId'})
    public orderId: number

    @column({ serializeAs: 'orderNo'})
    public orderNo : String

    @column({ serializeAs: 'orderStatus'})
    public orderStatus : number

    @column({ serializeAs: 'orderPrice'})
    public orderPrice : number

    @column({serializeAs: 'createTime'})
    public createTime: Date

    @column({serializeAs: 'updateTime'})
    public updateTime: Date

    @column({ serializeAs: 'userId'})
    public userId : number

}