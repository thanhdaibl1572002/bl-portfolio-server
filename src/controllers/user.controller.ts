import { Request, Response } from 'express'
import HttpResponse from '@/utils/HttpResponse'
import HttpStatusCode from '@/utils/HttpStatusCode'
import HttpStatusText from '@/utils/HttpStatusText'
import User from '@/models/user.model'

export class UserController {
  constructor() { }
  async getUserByGoogleId(req: Request, res: Response): Promise<Response<HttpResponse<any>>> {
    try {
      const googleId = req.params.googleId
      const user = await User.findOne({ googleId })
      if (!user) {
        return res
        .status(HttpStatusCode.NOT_FOUND)
        .json(new HttpResponse(HttpStatusCode.NOT_FOUND, HttpStatusText.NOT_FOUND, 'User not found.'))
      }
      return res
      .status(HttpStatusCode.OK)
      .json(new HttpResponse(HttpStatusCode.OK, HttpStatusText.OK, 'User found.', user))
    } catch (error) {
      console.error(error)
      return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json(new HttpResponse(HttpStatusCode.INTERNAL_SERVER_ERROR, HttpStatusText.INTERNAL_SERVER_ERROR, 'Failed to get user.'))
    }
  }
}