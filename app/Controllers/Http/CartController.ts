import Database from '@ioc:Adonis/Lucid/Database'
import Cart from 'App/Models/Cart'
import Logger from '@ioc:Adonis/Core/Logger'

export default class CartController {
    public async create({request}) {
        const { userId,productId, productNum} = request.body()
        try {

            Cart.create({
                userId,productId, productNum
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

    public async addCart({request}) {
        const { userId,productId, productNum} = request.body()
        let data
        console.log('productId: ',productId)
        console.log('productId: ',productId)
        const cart = await Cart.query().where('userId', userId).andWhere('productId', productId)
        console.log('cart: ',cart)
        try {
            if (cart && cart[0] && cart[0].cartId) {
                const originNum = cart[0].productNum
                data = await Cart.query().where('cartId', cart[0].cartId).update({productNum: productNum + originNum})
            } else {
                data =  await Cart.create({
                    userId,productId, productNum
                })
            }
        } catch (error) {
            Logger.error(error)
            return {
                status: 500,
                msg: error
            }    
        }
        return {
            status: 200,
            data,
            msg: 'success'
        }
        
    }

    public async getCartDetail({request}){
        const userId = request.input('userId')
        const pageNumber = request.input('pageNumber', 1)
        const pageSize= request.input('pageSize', 10)
        console.log('userID: ',userId)
        return Database
            .from('cart').where('cart.userId', userId)
            .join('product', 'cart.productId', '=', 'product.productId')
            .select('cart.*')
            .select('product.productName')
            .select('productPrice')
            .select('productImg')
            .select('productStock')
            .paginate(pageNumber, pageSize)
    }

    public async getCartDetailsByProductIds({request}){
        const ids = request.input('ids')
        const userId = request.input('userId')
        console.log('userID: ',userId)
        console.log('ids: ',ids)
        try {
            const result = Database
            .from('cart').where('cart.userId', userId)
            .whereIn('cart.productId', ids)
            .join('product', 'cart.productId', '=', 'product.productId')
            .select('cart.*')
            .select('product.productName')
            .select('product.productPrice')
            .select('product.productImg')
            .select('product.productStock')
        // const result = Cart.query().whereIn('cart.productId', ids).where('userId', userId)
        // .leftOuterJoin('product', 'cart.productId', '=', 'product.productId')
        // .select('cart.*').select('product.productName').select('product.productPrice').select('product.productImg')   
        
            console.log('result: ',result)
        
            return result
            
        } catch (error) {
            Logger.error(error)
        }
       
    }

    public async delete({request}) {
        const { ids } = request.body()
        console.log('ids: ',ids)
        console.log(request.input('ids'))
        try {
            for (const id of ids) {
                await Cart.query().where('cartId', id).delete()
            }
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

    public async update({request}) {
        const productId = request.input('productId')
        const cartId = request.input('cartId')
        const productNum = request.input('productNum')

        return await Cart.query().where('cartId', cartId).where('productId', productId).update({
            productNum
        })
    }  

    public async getCartNum({request}) {
        const userId = request.input('userId')
        return await Cart.query().where('userId', userId)
    }
}
