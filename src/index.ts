import express, { Application } from 'express'
import { json, urlencoded } from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { config } from 'dotenv'
import cookieParser from 'cookie-parser'
import { Server } from 'socket.io'
import http from 'http'
import Logger, { getCallerName } from '@/utils/Logger'
import MongoDB from '@/utils/MongoDB'
import { AuthRouter } from '@/routes/auth.route'
import { ConversationRouter } from '@/routes/conversation.route'
import { UserRouter } from '@/routes/user.route'

class App {
  private app: Application
  private server: http.Server
  private io: Server
  constructor() {
    this.app = express()
    this.server = http.createServer(this.app)
    this.io = new Server(this.server, {
      cors: {
        origin: process.env.CLIENT_URL,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
      }
    })
    this.config()
    this.routes()
    this.socketRoutes()
    this.start()
  }

  private config(): void {
    config()
    this.app.use(json())
    this.app.use(morgan('dev'))
    this.app.use(cookieParser())
    this.app.use(urlencoded({ 
      extended: false 
    }))
    this.app.use(helmet({ 
      contentSecurityPolicy: false 
    }))
    this.app.use(cors({ 
      origin: process.env.CLIENT_URL, 
      methods: 'GET, POST, PUT, DELETE', 
      credentials: true 
    }))
  }

  private routes(): void {
    const authRouter = new AuthRouter()
    const conversationRouter = new ConversationRouter()
    const userRouter = new UserRouter()
    this.app.use('/auth', authRouter.getRouter())
    this.app.use('/conversation', conversationRouter.getRouter())
    this.app.use('/user', userRouter.getRouter())
  }

  private socketRoutes(): void {
    this.io.on('connection', (socket) => {
      console.log('User connected', socket.id)

      socket.on('disconnect', () => {
        console.log('User disconnected', socket.id)
      })

      socket.on('chat message', (msg) => {
        console.log('Message:', msg)
        this.io.emit('chat message', msg)
      })
    })
  }

  private start(): void {
    this.app.listen(process.env.SERVER_PORT, () => {
      const logger = new Logger(getCallerName(module))
      logger.info(`Máy chủ chạy trên cổng: ${process.env.SERVER_PORT}.`)
      new MongoDB()
    })
  }
}

export default new App()


