import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import CamelCaseNamingStrategy from './CamelCaseNamingStrategy'
BaseModel.namingStrategy = new CamelCaseNamingStrategy()
export default class Category extends BaseModel {

    public static get table() {
        return 'Category'
    }

    @column({ isPrimary: true, serializeAs: 'categoryId'})
    public categoryId: number

    @column({serializeAs: 'categoryName'})
    public categoryName: String

    @column({serializeAs: 'sortOrder'})
    public sortOrder: number

    @column({serializeAs: 'parentId'})
    public parentId: number

    @column({serializeAs: 'createTime'})
    public createTime: Date

    @column({serializeAs: 'updateTime'})
    public updateTime: Date
}