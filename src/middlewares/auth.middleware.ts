import { Request, Response, NextFunction } from 'express'
import HttpResponse from '@/utils/HttpResponse'
import HttpStatusCode from '@/utils/HttpStatusCode'
import HttpStatusText from '@/utils/HttpStatusText'
import { firebaseAdminAuth } from '@/utils/Firebase'

export class AuthMiddleware {
  constructor() {}
  async checkAuth(req: Request, res: Response, next: NextFunction): Promise<Response<HttpResponse<any>> | void> {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) 
      return res
      .status(HttpStatusCode.UNAUTHORIZED)
      .json(new HttpResponse(HttpStatusCode.UNAUTHORIZED, HttpStatusText.UNAUTHORIZED, 'Không có token'))
    try {
      const decodedToken = await firebaseAdminAuth.verifyIdToken(token)
      const googleId = decodedToken.uid
      req.user = { googleId: googleId }
      next()
    } catch (error) {
      console.error(error)
      return res
      .status(HttpStatusCode.UNAUTHORIZED)
      .json(new HttpResponse(HttpStatusCode.UNAUTHORIZED, HttpStatusText.UNAUTHORIZED, 'Lỗi khác'))
    }
  }
}