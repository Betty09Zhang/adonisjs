import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import CamelCaseNamingStrategy from './CamelCaseNamingStrategy'
BaseModel.namingStrategy = new CamelCaseNamingStrategy()
export default class User extends BaseModel {

    public static get table() {
        return 'User'
    }

    @column({ isPrimary: true, serializeAs: 'userId'})
    public userId: number

    @column({ serializeAs: 'name'})
    public name : string

    @column({ serializeAs: 'avatar'})
    public avatar : string

    @column({ serializeAs: 'password'})
    public password : string

    @column({ serializeAs: 'userAuth'})
    public userAuth : number

    @column({ serializeAs: 'createTime'})
    public createTime : Date
    
    @column({ serializeAs: 'updateTime'})
    public updateTime : Date

}
