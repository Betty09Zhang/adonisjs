import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import CamelCaseNamingStrategy from './CamelCaseNamingStrategy'
BaseModel.namingStrategy = new CamelCaseNamingStrategy()
export default class OrderDetail extends BaseModel {

    public static get table() {
        return 'orderdetail'
    }

    @column({ isPrimary: true, serializeAs: 'orderDetailId'})
    public orderDetailId: number

    @column({ serializeAs: 'userId'})
    public userId : number

    @column({ serializeAs: 'orderId'})
    public orderId : number

    @column({ serializeAs: 'productId'})
    public productId : number

    @column({ serializeAs: 'productNum'})
    public productNum : number

    @column({ serializeAs: 'address'})
    public address : String

    @column({ serializeAs: 'tel'})
    public tel : String

    @column({serializeAs: 'receiveName'})
    public receiveName: String

    @column({serializeAs: 'createTime'})
    public createTime: Date

    @column({serializeAs: 'updateTime'})
    public updateTime: Date

}