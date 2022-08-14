import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Category from 'App/Models/Category'
import Drive from '@ioc:Adonis/Core/Drive'
import Logger from '@ioc:Adonis/Core/Logger'
// import { handleDate } from 'utils/utils'
import Application from '@ioc:Adonis/Core/Application'
export default class CategoryController {
  public async index({}) {
    return Database.from('category').select('*')
  }
  public async getCategoryByCategoryId(ctx: HttpContextContract) {
    const categoryId = ctx.params.categoryId
    return Database.from('category').select('*').where('categoryId', categoryId)
  }

  public async judgeCategory({request}) {
    const categoryId = request.input('categoryId')
    const category = await Category.query().where('parentId', categoryId)
    console.log('category: ',category)
    if (category) {
      return {
        status: '200',
        result: true
      }
    }
  }


  public async create({request}) {
    // Transaction created
    const { parentId,categoryName, sortOrder } = request.body()
    let category
    try {
      category = await Category.create({
        parentId,
        categoryName,
        sortOrder,
        createTime:  new Date()
      })
    } catch (error) {
      Logger.error(error)
      return {
        status: '500',
        msg: error
      }
    }
    return category
  }
  public async paginationList ({request}) {
    const pageNumber = request.input('pageNumber', 1)
    const pageSze= request.input('pageSize', 10)
    const parentId= request.input('parentId')
    return Database.from('category').select('*').where('parentId', parentId).paginate(pageNumber, pageSze)
  }
  public async update({request}) {
    console.log('update request', request.requestBody)
    const categoryId = request.input('categoryId')
    const categoryName = request.input('categoryName')
    const sortOrder = request.input('sortOrder')
    console.log('categoryName', categoryName)
    try {
      await Category.query().where('categoryId', categoryId).update({categoryName:categoryName,sortOrder:sortOrder})
    } catch (error) {
      Logger.error(error)
      return {
        status: '500',
        msg: error
      }
    }
    return {
      status: '200',
      msg:'success'
    }
  }

  public async delete({request}) {
    const { ids } = request.body()
    try {
      for (const id of ids) {
        await Category.query().where('categoryId', id).delete()
      }
    } catch (error) {
      Logger.error(error)
      return {
        status: '500',
        msg: error
      }
    }
    return {
      status: '200',
      msg:'success'
    }
  }

  /**
   * 递归找出所有子category
   * @param categoryId 
   * @returns 
   */
  public async getCascaderCategories(categoryId :number) {
    let category
    let categoryArr:Category[] = []
    while ( categoryId !=0 ) {
        category = await Category.findBy('parentId', categoryId)
        console.log('category；categoryName ', category.categoryName)
        if ( Object.keys(category) && Object.keys(category).length > 0) {
            category.children= category
            categoryId = category.categoryId
        } else {
            return categoryArr
        } 
    }
    console.log('category；categoryArr ', categoryArr)
    return categoryArr
  }

  public async uploadImages({request}) {
    const image = request.file('file',{
      size: '2mb',
      extnames: ['jpg', 'png', 'jpeg'],
    })
    if (!image) {
      return
    }
    
    if (!image.isValid) {
      return image.errors
    }
    console.log('image: ', image)
    const fileName = image.clientName
    await image.move(Application.tmpPath('uploads'))
    const imgURL = await Drive.getUrl(`${fileName}`)
    return {
      status: 200,
      imgURL
    }
  }
}