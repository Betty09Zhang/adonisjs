import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import CamelCaseNamingStrategy from './CamelCaseNamingStrategy'
BaseModel.namingStrategy = new CamelCaseNamingStrategy()
export default class Product extends BaseModel {
    
    public static get table() {
        return 'Product'
    }

    @column({ isPrimary: true, serializeAs: 'productId'})
    public productId: number

    @column({serializeAs: 'productName'})
    public productName: string

    @column({serializeAs: 'productDescription'})
    public productDescription: string

    @column({serializeAs: 'productStock'})
    public productStock: number

    @column({serializeAs: 'productPrice'})
    public productPrice: number

    @column({serializeAs: 'categoryId'})
    public categoryId: number

    @column({serializeAs: 'productImg'})
    public productImg: string

    @column({serializeAs: 'productStatus'})
    public productStatus: number

    @column({serializeAs: 'createTime'})
    public createTime: Date

    @column({serializeAs: 'updateTime'})
    public updateTime: Date
}