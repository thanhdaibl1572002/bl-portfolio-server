import { ChatController } from '@/controllers/chat.controller'
import { MessageController } from '@/controllers/message.controller'
import { UserController } from '@/controllers/user.controller'
import { Socket, Server } from 'socket.io'
import fs, { writeFile, writeFileSync } from 'fs'
import { v4 } from 'uuid'

export class SocketRouter {
  private io: Server

  constructor(io: Server) {
    this.io = io
    this.setupSocketEvents()
  }

  private setupSocketEvents(): void {
    this.io.on('connection', (socket: Socket) => {
      console.log('User connected.', socket.id)

      socket.on('disconnect', () => {
        console.log('User disconnected.', socket.id)
      })

      socket.on('updateSocketId', async (data: { userId: string }) => {
        await UserController.updateSocketId(data.userId, socket.id)
      })

      socket.on('newChat', async (data: { userId: string }) => {
        const socketIdAdmin = await UserController.getSocketIdAdmin()
        if (!socketIdAdmin) return
        const chat = await ChatController.getChatByUserId(data.userId)
        if (!chat) return
        this.io.to(socketIdAdmin).emit('getNewChat', chat)
      })

      socket.on('sendText', async (data: { userId: string, content: string, from: string }) => {
        const socketIdUser = await UserController.getSocketIdUser(data.userId)
        const socketIdAdmin = await UserController.getSocketIdAdmin()
        if (!socketIdUser || !socketIdAdmin) return
        const user = await UserController.checkExistedUser(data.userId)
        if (!user) return
        const createdMessage = await MessageController.createMessage(user._id, 'text', data.content, data.from)
        this.io.to(socketIdUser).emit('receiveMessage', createdMessage)
        this.io.to(socketIdAdmin).emit('receiveMessage', createdMessage)
      })

      socket.on('sendImage', async (data: { userId: string, images: Array<Buffer>, from: string }) => {
        const socketIdUser = await UserController.getSocketIdUser(data.userId)
        const socketIdAdmin = await UserController.getSocketIdAdmin()
        if (!socketIdUser || !socketIdAdmin) return
        const user = await UserController.checkExistedUser(data.userId)
        if (!user) return
        data.images.map(async image => {
          const fileName = `${v4()}.png`
          fs.writeFileSync(`public/${fileName}`, image)
          const createdMessage = await MessageController.createMessage(user._id, 'image', fileName, data.from)
          this.io.to(socketIdUser).emit('receiveMessage', createdMessage)
          this.io.to(socketIdAdmin).emit('receiveMessage', createdMessage)
        })
      })

      socket.on('updateEmotion', async (data: { userId: string, messageId: string, emotion: string, from: string }) => {
        const socketIdUser = await UserController.getSocketIdUser(data.userId)
        const socketIdAdmin = await UserController.getSocketIdAdmin()
        if (!socketIdUser || !socketIdAdmin) return
        const user = await UserController.checkExistedUser(data.userId)
        if (!user) return
        const updatedMessage = await MessageController.updateEmotion(data.messageId, data.emotion, data.from)
        this.io.to(socketIdUser).emit('updateMessage', updatedMessage)
        this.io.to(socketIdAdmin).emit('updateMessage', updatedMessage)
      })
    })
  }
}

