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
    this.router.get('/get-all-message-by-user-id/:userId', this.authMiddleware.checkAuth, this.messageController.getAllMessageByUserId)
  }

  getRouter(): Router {
    return this.router
  }
}