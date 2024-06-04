import { Router } from 'express'
import { ChatController } from '@/controllers/chat.controller'
import { AuthMiddleware } from '@/middlewares/auth.middleware'

export class ChatRouter {
  private router: Router
  private chatController: ChatController
  private authMiddleware: AuthMiddleware

  constructor() {
    this.router = Router()
    this.chatController = new ChatController()
    this.authMiddleware = new AuthMiddleware()
    this.initRoutes()
  }

  private initRoutes(): void {
    this.router.get('/get-chat-list', this.authMiddleware.checkAuth, this.chatController.getChatList)
  }

  getRouter(): Router {
    return this.router
  }
}