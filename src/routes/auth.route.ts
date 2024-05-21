import { Router } from 'express'
import { AuthController } from '@/controllers/auth.controller'
import { AuthMiddleware } from '@/middlewares/auth.middleware'

export class AuthRouter {
  private router: Router
  private authController: AuthController
  private authMiddleware: AuthMiddleware

  constructor() {
    this.router = Router()
    this.authController = new AuthController()
    this.authMiddleware = new AuthMiddleware()
    this.initRoutes()
  }

  private initRoutes(): void {
    this.router.post('/sign-in', this.authMiddleware.checkAuth, this.authController.signIn)
  }

  getRouter(): Router {
    return this.router
  }
}