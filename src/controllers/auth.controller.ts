import { config } from 'dotenv'
import { Request, Response } from 'express'
import HttpResponse from '@/utils/HttpResponse'
import HttpStatusCode from '@/utils/HttpStatusCode'
import HttpStatusText from '@/utils/HttpStatusText'
import User from '@/models/user.model'
import { ConversationController } from '@/controllers/conversation.controller'
config()

export class AuthController {
  constructor() { }
  async signIn(req: Request, res: Response): Promise<Response<HttpResponse<any>>> {
    try {
      const { email, displayName, photoURL } = req.body
      const admin = await User.findOne({ email: process.env.ADMIN_EMAIL })
      if (!admin) throw new Error('Admin not found.')
      const adminId = admin._id
      if (!adminId) throw new Error('Admin Id not found.')
      const existingUser = await User.findOne({ email })
      if (existingUser) {
        existingUser.displayName = displayName
        existingUser.photoURL = photoURL
        await existingUser.save()
        await ConversationController.createConversation([existingUser._id.toString(), adminId.toString()])
        return res
        .status(HttpStatusCode.OK)
        .json(new HttpResponse(HttpStatusCode.OK, HttpStatusText.OK, 'User and Conversation updated.'))
      }
      const newUser = new User({ email, displayName, photoURL })
      const savedUser = await newUser.save()
      await ConversationController.createConversation([savedUser._id.toString(), adminId.toString()])
        return res
        .status(HttpStatusCode.CREATED)
        .json(new HttpResponse(HttpStatusCode.CREATED, HttpStatusText.CREATED, 'User and Conversation created.'))
    } catch (error: any) {
      console.error(error)
      return res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json(new HttpResponse(HttpStatusCode.INTERNAL_SERVER_ERROR, HttpStatusText.INTERNAL_SERVER_ERROR, error.message))
    }
  }
}




