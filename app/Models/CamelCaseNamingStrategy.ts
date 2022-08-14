import { SnakeCaseNamingStrategy, BaseModel } from '@ioc:Adonis/Lucid/Orm'
import { string } from '@ioc:Adonis/Core/Helpers'

export default class CamelCaseNamingStrategy extends SnakeCaseNamingStrategy {
    public columnName(_model: typeof BaseModel, propertyName: string) {
        return string.camelCase(propertyName)
      }
}