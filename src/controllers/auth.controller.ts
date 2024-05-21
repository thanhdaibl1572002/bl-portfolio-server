import { Request, Response } from 'express'
import HttpResponse from '@/utils/HttpResponse'
import HttpStatusCode from '@/utils/HttpStatusCode'
import HttpStatusText from '@/utils/HttpStatusText'
import User from '@/models/user.model'

export class AuthController {
  constructor() { }
  async signIn(req: Request, res: Response): Promise<Response<HttpResponse<any>>> {
    try {
      const { email, googleId, displayName, photoURL } = req.body
      const existingUser = await User.findOne({ googleId })
      if (existingUser) {
        existingUser.displayName = displayName
        existingUser.photoURL = photoURL
        await existingUser.save()
        return res
          .status(HttpStatusCode.OK)
          .json(new HttpResponse(HttpStatusCode.OK, HttpStatusText.OK, 'User updated'))
      }
      const newUser = new User({ email, googleId, displayName, photoURL })
      await newUser.save()
      return res
        .status(HttpStatusCode.CREATED)
        .json(new HttpResponse(HttpStatusCode.CREATED, HttpStatusText.CREATED, 'User created'))
    } catch (error: any) {
      console.error(error)
      return res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json(new HttpResponse(HttpStatusCode.INTERNAL_SERVER_ERROR, HttpStatusText.INTERNAL_SERVER_ERROR, error.message))
    }
  }
}




