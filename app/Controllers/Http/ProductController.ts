import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Category from 'App/Models/Category'
import Product from '../../Models/Product'
import Logger from '@ioc:Adonis/Core/Logger'

export default class ProductController {
    public async create({request}) {
        const { productStock,productName, productDescription,productPrice, 
            categoryId,productImg,productStatus} = request.body()
        try {
            await Product.create({
                productStock,productName, productDescription,productPrice, 
                categoryId,productImg,productStatus,
                createTime: new Date()
            })
        } catch (error) {
            Logger.error(error)
            return {
                status: 500,
                msg: error
            }
        }
        return {
            status: 200,
            msg: 'success'
        }
    }

    public async update({request}) {
        const productId = request.input('productId')
        const categoryId = request.input('categoryId')
        const productImg = request.input('productImg')
        const productDescription = request.input('productDescription')
        const productName = request.input('productName')
        const productStatus = request.input('productStatus')
        const productPrice = request.input('productPrice')
        const productStock = request.input('productStock')

        try {
          await Product.query().where('productId', productId).update({categoryId,productImg,productDescription,
            productName,productStatus,productPrice,productStock})
        } catch (error) {
          Logger.error(error)
          return {
            status: 500,
            msg: error
          }
        }
        return {
          status: 200,
          msg:'success'
        }
    }

    public async updateStatus({request}) {
        const status = request.input('status')
        const productId = request.input('productId')
        await Product.query().where('productId', productId).update({productStatus:status})

    }
    public async paginationList ({request}) {
        const pageNumber = request.input('pageNumber')
        const pageSize= request.input('pageSize')
        const productStatus= request.input('productStatus', 0)
        // return Database.from('product').select('*').where().paginate(pageNumber, pageSize)
        return Product.query().where('productStatus', productStatus).paginate(pageNumber, pageSize)
    }

    /**
     * 
     * @param ctx 
     * @returns  返回商品和 商品所属的类别
     */
    public async getProductByProductId(ctx: HttpContextContract) {
        const productId = ctx.params.productId
        console.log('productId: ',productId)
        const product = await Product.findBy('productId', productId)
        console.log('product: ',product)
        if (product) {
            const categoryId = product.categoryId 
            const party = await this.getCascaderCategoryName(categoryId)
            return {
                product,
                party
            }
        } else {
            return {
                status: 200,
                data: []
            }
        }  
        return Database.from('product').select('*').where('productId', productId)
    }

    public async getCascaderCategoryName(categoryId :number) {
        let category
        let categoryArr = ''
    
        while ( categoryId !=0 ) {
            category = await Category.findBy('categoryId', categoryId)
            console.log('category；categoryName ', category.categoryName)
            if ( Object.keys(category) && Object.keys(category).length > 0) {
                categoryArr = (category.categoryName) + '/' + categoryArr
                categoryId = category.parentId
            } else {
                return categoryArr.substring(0,categoryArr.lastIndexOf('/'))
            } 
        }
        console.log('category；categoryArr ', categoryArr)
        return categoryArr.substring(0,categoryArr.lastIndexOf('/'))
    }

    public async queryProduct({request}){
        const name = request.input('name')
        let param = `%${name}%`
        console.log('param: ',param)
        if (name) {
            return  Database.rawQuery('select * from product where productName like ?', [param])
        } else {
            return  Database.rawQuery('select * from product')
        }
       
    }
    
    // 查所有的子ids
    public async queryProductByCategory ({request}) {
        const id = request.input('categoryId')
        console.log('id: ', id)
        let categoryIdArr = [parseInt(id)]
        let ids = [id]
        let categoryId
        while (categoryId=categoryIdArr.pop()) {
            let categories = await Category.query().where('parentId',categoryId)
            if (categories) {
                for (const category of categories) {
                    categoryIdArr.push(category.categoryId)
                    ids.push(category.categoryId)
                }
            }
        }
        console.log('ids: ',ids)
       

        return Database.from('product').whereIn('product.categoryId', ids)
     }
}