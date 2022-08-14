import {ApplicationContract} from '@ioc:Adonis/Core/Application'
import { ProductServiceImp } from 'App/Service/ProductServiceImp/ProductServiceImp'
export default class NotifySericeProvider {
    constructor(protected app: ApplicationContract) {

    }

    public register() {
        this.app.container.bind('@ioc:product/productService', () => {
            console.log('@ioc:product/productService: ')
            return new ProductServiceImp()
        })
    }
    
    public async boot () {
        console.log('ready')
    }
}