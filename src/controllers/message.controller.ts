import { Request, Response } from 'express'
import HttpResponse from '@/utils/HttpResponse'
import HttpStatusCode from '@/utils/HttpStatusCode'
import HttpStatusText from '@/utils/HttpStatusText'
import Message from '@/models/message.model'

export class MessageController {
  constructor() { }
  async getAllMessagesForConversation(req: Request, res: Response): Promise<Response<HttpResponse<any>>> {
    const conversationId = req.params.conversationId
    try {
      const messages = await Message.find({ conversationId: conversationId }).populate('senderId').populate('receiverId')
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

  async createMessage(req: Request, res: Response): Promise<Response<HttpResponse<any>>> {
    try {
      const newMessage = new Message(req.body)
      const savedMessage = await newMessage.save()
      return res
        .status(HttpStatusCode.CREATED)
        .json(new HttpResponse(HttpStatusCode.CREATED, HttpStatusText.CREATED, 'Message created successfully.', savedMessage))
    } catch (error) {
      console.log(error)
      return res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json(new HttpResponse(HttpStatusCode.INTERNAL_SERVER_ERROR, HttpStatusText.INTERNAL_SERVER_ERROR, 'Failed to create message.'))
    }
  }
}