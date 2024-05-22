import { Request, Response } from 'express'
import HttpResponse from '@/utils/HttpResponse'
import HttpStatusCode from '@/utils/HttpStatusCode'
import HttpStatusText from '@/utils/HttpStatusText'
import Conversation from '@/models/conversation.model'

export class ConversationController {
  constructor() { }
  async getAllConversation(req: Request, res: Response): Promise<Response<HttpResponse<any>>> {
    try {
      const conversations = await Conversation.find().populate('participants')
      return res
      .status(HttpStatusCode.OK)
      .json(new HttpResponse(HttpStatusCode.OK, HttpStatusText.OK, 'Get all conversation successfully.', conversations))
    } catch (error) {
      console.log(error)
      return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json(new HttpResponse(HttpStatusCode.INTERNAL_SERVER_ERROR, HttpStatusText.INTERNAL_SERVER_ERROR, 'Failed to get all conversation.'))
    }
  }

  public static async createConversation(participants: Array<string>) {
    try {
      if (!Array.isArray(participants) || participants.length < 2) 
        throw new Error('Participants must be an array with at least 2 members.')
      const existingConversation = await Conversation.findOne({ participants })
      if (existingConversation) return existingConversation
      const newConversation = new Conversation({ participants })
      const savedConversation = await newConversation.save()
      return savedConversation
    } catch (error) {
      console.error(error)
    }
  }

  async getConversationById(req: Request, res: Response): Promise<Response<HttpResponse<any>>> {
    try {
      const conversationId = req.params.conversationId
      const conversation = await Conversation.findById(conversationId).populate('participants')
      if (!conversation) {
        return res
        .status(HttpStatusCode.NOT_FOUND)
        .json(new HttpResponse(HttpStatusCode.NOT_FOUND, HttpStatusText.NOT_FOUND, 'Conversation not found.'))
      }
      return res
      .status(HttpStatusCode.OK)
      .json(new HttpResponse(HttpStatusCode.OK, HttpStatusText.OK, 'Conversation found.', conversation))
    } catch (error) {
      console.error(error)
      return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json(new HttpResponse(HttpStatusCode.INTERNAL_SERVER_ERROR, HttpStatusText.INTERNAL_SERVER_ERROR, 'Failed to get conversation.')
      )
    }
  }
}