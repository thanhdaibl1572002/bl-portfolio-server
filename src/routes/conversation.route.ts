import { Router } from 'express'
import { ConversationController } from '@/controllers/conversation.controller'
import { AuthMiddleware } from '@/middlewares/auth.middleware'

export class ConversationRouter {
  private router: Router
  private conversationController: ConversationController
  private authMiddleware: AuthMiddleware

  constructor() {
    this.router = Router()
    this.conversationController = new ConversationController()
    this.authMiddleware = new AuthMiddleware()
    this.initRoutes()
  }

  private initRoutes(): void {
    this.router.get('/get-all-conversation', this.authMiddleware.checkAuth, this.conversationController.getAllConversation)
    this.router.get('/get-conversation-by-id/:conversationId', this.authMiddleware.checkAuth, this.conversationController.getConversationById)
  }

  getRouter(): Router {
    return this.router
  }
}