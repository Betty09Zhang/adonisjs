// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from "App/Models/User"
import Hash from "@ioc:Adonis/Core/Hash"
import Logger from '@ioc:Adonis/Core/Logger'
// import argon2 from 'phc-argon2'

export default class UserController {
  public async login({auth, request, response}) {
    const userName = request.input('userName')
    const userPassword  = request.input('userPassword')
    console.log('userPawword: ', userPassword)
    // const hashPassword= await argon2.hash(userPassword)
    const hashPassword = await Hash.make(userPassword)
    console.log('UserController hashPassword : ', hashPassword)
    try {
      const token = await auth.use('api').attempt( userName, hashPassword, {
        expiresIn: '30mins'
      })
      const user = auth.use('api').user
      return response.json({
        ...token,
        user: {
          username: user.name,
          userAuth: user.userAuth,
          userId: user.userId
        }
      })
      
    } catch (error) {
      Logger.error(error)
      console.log('error', error)
      return response.badRequest('Invalid credentials')
    }
    
  }

  public async create({request, response}) {
    const userName = request.input('userName')
    const userPassword  = request.input('userPassword')
    // const hashPassword= await argon2.hash(userPassword)
    // // const hashPassword = await Hash.make(userPassword)
    // console.log('hashPassword； ', hashPassword)

    let userIns
    try {

        userIns = await User.create({
            name: userName,
            password:userPassword,
            createTime: new Date()
        })
        return response.json({
          status: 200,
          msg: 'success',
          user: userIns
      })

    } catch (error) {
        Logger.error(error)
        return  response.json({
            status: 500,
            msg: error
        })      
    }
   
  }

  public async logout({ auth, response }) {
    await auth.use('api').revoke()
    return response.json({
      revoked: true
    })
  }
}