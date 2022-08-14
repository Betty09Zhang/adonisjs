/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
// import AuthMiddleware from 'App/Middleware/Auth'
// import Database from '@ioc:Adonis/Lucid/Database'

Route.get('/categoryList', 'CategoryController.index')
// Route.get('user', async () => {
//   return Database.from('category').select('*')
// })

Route.get('/categories/findByPagination', 'CategoryController.paginationList')

Route.get(`/categories/:categoryId`, 'CategoryController.getCategoryByCategoryId')

Route.get(`/categories/isLeaf`, 'CategoryController.judgeCategory')


Route.post(`/categories/create`, 'CategoryController.create')

Route.put('/categories/update', 'CategoryController.update')

Route.delete('/categories/delete', 'CategoryController.delete')

Route.post('gallery', 'CategoryController.uploadImages')

Route.get('/getCascaderCategories', 'CategoryController.getCascaderCategories')

/**
 * 商品 增删改查
 */
Route.post(`/product/create`, `ProductController.create`)
Route.put(`/product/update`, `ProductController.update`)
Route.get('/product/findByPagination', 'ProductController.paginationList')
Route.get(`/product/queryProduct`, `ProductController.queryProduct`)
Route.get(`/product/queryProductByCategory`, `ProductController.queryProductByCategory`)

Route.get(`/product/:productId`, 'ProductController.getProductByProductId')
Route.put(`/product/status`, `ProductController.updateStatus`)


/**
 * Cart
 */
Route.post(`/cart/create`, `CartController.create`)
Route.post(`/cart/addCart`, `CartController.addCart`)
Route.get('/cart/getCartDetail', `CartController.getCartDetail`)
Route.get(`/cart/getCartNum`, `CartController.getCartNum`)
// Route.put(`/product/update`, `ProductController.update`)
// Route.get('/product/findByPagination', 'ProductController.paginationList')
// Route.get(`/product/:productId`, 'ProductController.getProductByProductId')
// Route.put(`/product/status`, `ProductController.updateStatus`)

Route.delete('/cart/delete', 'CartController.delete')
Route.put('/cart/update', 'CartController.update')



Route.get('/cart/getCartDetailsByProductIds', 'CartController.getCartDetailsByProductIds').middleware('auth')


Route.post(`/order/create`, `OrderController.create`).middleware('auth')


Route.get(`/orderDetail/getOrderDetail`, `OrderDetailController.getOrderDetail`).middleware('auth')

// Route.post(`/order/updateStatus`, `OrderController.updateStatus`).middleware('auth')

Route.post('/order/updateStatusTry', () => {console.log('try')})
Route.post('/order/updateStatusConfirm', 'OrderController.updateStatusConfirm')
Route.post('/order/updateStatusCancel', 'OrderController.updateStatusCancel')

Route.post(`/order/fireTcc`, `OrderController.fireTcc`)


Route.get('/notify/sendMsg', `NotifyController.sendStockMsg`)


Route.post(`/user/create`, `UserController.create`)
Route.post(`/user/login`, `UserController.login`)
Route.post(`/user/logout`, `UserController.logout`)