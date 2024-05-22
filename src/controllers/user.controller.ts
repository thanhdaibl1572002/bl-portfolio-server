import { config } from 'dotenv'
import User from '@/models/user.model'
config()

export class UserController {
  constructor() { }
  public static async getSocketIdAdmin(): Promise<string | null> {
    try {
      const admin = await User.findOne({ email: process.env.ADMIN_EMAIL })
      if (!admin) throw new Error('Socket Id Admin not found.')
      return admin.socketId
    } catch (error: any) {
      console.error(error)
      return null
    }
  }

  public static async getSocketIdUser(email: string): Promise<string | null> {
    try {
      const user = await User.findOne({ email: email })
      if (!user) throw new Error('Socket Id User not found.')
      return user.socketId
    } catch (error: any) {
      console.error(error)
      return null
    }
  }

  public static async updateSocketId(email: string, socketId: string): Promise<void> {
    try {
      await User.findOneAndUpdate({ email }, { $set: { socketId: socketId } }, { new: true })
    } catch(error: any) {
      console.error(error)
    }
  }
}