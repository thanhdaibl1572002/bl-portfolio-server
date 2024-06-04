import { Request, Response } from 'express'
import HttpResponse from '@/utils/HttpResponse'
import HttpStatusCode from '@/utils/HttpStatusCode'
import HttpStatusText from '@/utils/HttpStatusText'
import Message from '@/models/message.model'
import { Types } from 'mongoose'
import { UserController } from './user.controller'

export class MessageController {
  constructor() { }
  async getAllMessageByUserId(req: Request, res: Response): Promise<Response<HttpResponse<any>>> {
    try {
      const userId = req.params.userId as string
      if (!userId)
        return res
          .status(HttpStatusCode.BAD_REQUEST)
          .json(new HttpResponse(HttpStatusCode.BAD_REQUEST, HttpStatusText.BAD_REQUEST, 'Missing userId body parameter.'))

      const user = await UserController.checkExistedUser(userId)
      if (!user)
        return res
          .status(HttpStatusCode.NOT_FOUND)
          .json(new HttpResponse(HttpStatusCode.NOT_FOUND, HttpStatusText.NOT_FOUND, 'User not found.'))

      const messages = await Message.find({ user: user._id }).populate('user', 'userId displayName photoURL')
      return res
        .status(HttpStatusCode.OK)
        .json(new HttpResponse(HttpStatusCode.OK, HttpStatusText.OK, 'Get all message for conversation successfully.', messages))
    } catch (error) {
      console.log(error)
      return res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json(new HttpResponse(HttpStatusCode.INTERNAL_SERVER_ERROR, HttpStatusText.INTERNAL_SERVER_ERROR, 'Failed to get all message for conversation.'))
    }
  }

  public static async updateEmotion(messageId: string, emotion: string, from: string) {
    try {
      const message = await Message.findById(messageId)
      if (!message) throw new Error('Message not found.')
      let updatedMessage
      if (from === 'admin') {
        message.emotions!.admin = emotion
        updatedMessage = (await message.save()).populate({
          path: 'user',
          select: 'userId displayName photoURL'
        })
      } else {
        message.emotions!.user = emotion
        updatedMessage = (await message.save()).populate({
          path: 'user',
          select: 'userId displayName photoURL'
        })
      }
    } catch (error) {
      console.log(error)
      return null
    }
  }

  public static async createMessage(
    user: Types.ObjectId,
    type: 'text' | 'image',
    content: string,
    from: string,
  ) {
    try {
      const newMessage = new Message({
        user: user,
        type: type,
        content: content,
        from: from,
      })
      const savedMessage = (await newMessage.save()).populate({
        path: 'user',
        select: 'userId displayName photoURL'
      })
      return savedMessage
    } catch (error) {
      console.error(error)
      return null
    }
  }
}