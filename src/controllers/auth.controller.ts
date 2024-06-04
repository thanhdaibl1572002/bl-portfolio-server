import { config } from 'dotenv'
import { Request, Response } from 'express'
import HttpResponse from '@/utils/HttpResponse'
import HttpStatusCode from '@/utils/HttpStatusCode'
import HttpStatusText from '@/utils/HttpStatusText'
import { UserController } from '@/controllers/user.controller'
config()

export class AuthController {
  constructor() { }
  async signIn(req: Request, res: Response): Promise<Response<HttpResponse<any>>> {
    try {
      const { userId, email, displayName, photoURL } = req.body
      const existingUser = await UserController.checkExistedUser(userId)
      if (existingUser) {
        existingUser.displayName = displayName
        existingUser.photoURL = photoURL
        await existingUser.save()
        return res
          .status(HttpStatusCode.OK)
          .json(new HttpResponse(HttpStatusCode.OK, HttpStatusText.OK, 'User updated.'))
      }
      await UserController.createUser(userId, email, displayName, photoURL)
      return res
        .status(HttpStatusCode.CREATED)
        .json(new HttpResponse(HttpStatusCode.CREATED, HttpStatusText.CREATED, 'User created.'))
    } catch (error: any) {
      console.error(error)
      return res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json(new HttpResponse(HttpStatusCode.INTERNAL_SERVER_ERROR, HttpStatusText.INTERNAL_SERVER_ERROR, error.message))
    }
  }
}




