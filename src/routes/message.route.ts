import { Router } from 'express'
import { MessageController } from '@/controllers/message.controller'
import { AuthMiddleware } from '@/middlewares/auth.middleware'

export class MessageRouter {
  private router: Router
  private messageController: MessageController
  private authMiddleware: AuthMiddleware

  constructor() {
    this.router = Router()
    this.messageController = new MessageController()
    this.authMiddleware = new AuthMiddleware()
    this.initRoutes()
  }

  private initRoutes(): void {
    this.router.get('/get-all-messages-for-conversation/:conversationId', this.authMiddleware.checkAuth, this.messageController.getAllMessagesForConversation)
    this.router.post('/create-message', this.authMiddleware.checkAuth, this.messageController.getAllMessagesForConversation)
  }

  getRouter(): Router {
    return this.router
  }
}