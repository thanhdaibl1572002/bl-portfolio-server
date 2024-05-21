import { Router } from 'express'
import { UserController } from '@/controllers/user.controller'
import { AuthMiddleware } from '@/middlewares/auth.middleware'

export class UserRouter {
  private router: Router
  private userController: UserController
  private authMiddleware: AuthMiddleware

  constructor() {
    this.router = Router()
    this.userController = new UserController()
    this.authMiddleware = new AuthMiddleware()
    this.initRoutes()
  }

  private initRoutes(): void {
    this.router.get('/get-user-by-google-id/:googleId', this.authMiddleware.checkAuth, this.userController.getUserByGoogleId)
  }

  getRouter(): Router {
    return this.router
  }
}