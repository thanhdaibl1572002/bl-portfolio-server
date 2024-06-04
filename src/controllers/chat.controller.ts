import { config } from 'dotenv'
import { Request, Response } from 'express'
import HttpResponse from '@/utils/HttpResponse'
import HttpStatusCode from '@/utils/HttpStatusCode'
import HttpStatusText from '@/utils/HttpStatusText'
import Message from '@/models/message.model'
import User from '@/models/user.model'
config()

interface IChatResult {
  userId: string
  displayName: string
  photoURL: string | undefined
  unreadCount: number
  lastMessage?: string
}

export class ChatController {
  constructor() { }
  async getChatList(req: Request, res: Response): Promise<Response<HttpResponse<Array<IChatResult>>>> {
    try {
      const users = await User.find({ userId: { $ne: process.env.ADMIN_ID } }).sort({ createdAt: -1 }).limit(10).select('userId displayName photoURL')
      const chatList = await Promise.all(
        users.map(async user => {
          const unreadCount = await Message.countDocuments({ user: user._id, unread: true })
          const lastMessage = await Message.findOne({ user: user._id }).sort({ createdAt: -1 })
          return {
            userId: user.toObject().userId,
            displayName: user.toObject().displayName,
            photoURL: user.toObject().photoURL!,
            unreadCount: unreadCount || 0,
            lastMessage: lastMessage?.content || 'Chưa có tin nhắn',
          }
        })
      )
      return res
        .status(HttpStatusCode.OK)
        .json(new HttpResponse(HttpStatusCode.OK, HttpStatusText.OK, 'Get chat list successfully.', chatList))
    } catch (error) {
      console.error(error)
      return res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json(new HttpResponse(HttpStatusCode.INTERNAL_SERVER_ERROR, HttpStatusText.INTERNAL_SERVER_ERROR, 'Failed to get conversation.'))
    }
  }

  public static async getChatByUserId(userId: string): Promise<IChatResult | null> {
    try {
      const user = await User.findOne({ userId }).select('userId displayName photoURL')
      if (!user) throw new Error('User not found.')
      const unreadCount = await Message.countDocuments({ user: user._id, unread: true })
      const lastMessage = await Message.findOne({ user: user._id }).sort({ createdAt: -1 })
      return {
        userId: user.toObject().userId,
        displayName: user.toObject().displayName,
        photoURL: user.toObject().photoURL!,
        unreadCount: unreadCount || 0,
        lastMessage: lastMessage?.content || 'Chưa có tin nhắn',
      } 
    } catch (error) {
      console.error(error)
      return null
    }
  }
}