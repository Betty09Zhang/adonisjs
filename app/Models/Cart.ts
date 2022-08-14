import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import CamelCaseNamingStrategy from './CamelCaseNamingStrategy'
BaseModel.namingStrategy = new CamelCaseNamingStrategy()
export default class Cart extends BaseModel {

    public static get table() {
        return 'Cart'
    }

    @column({ isPrimary: true, serializeAs: 'cartId'})
    public cartId: number

    @column({ serializeAs: 'userId'})
    public userId : number

    @column({ serializeAs: 'productId'})
    public productId : number

    @column({ serializeAs: 'productNum'})
    public productNum : number

    @column({ serializeAs: 'isCheck'})
    public isCheck : number


}
