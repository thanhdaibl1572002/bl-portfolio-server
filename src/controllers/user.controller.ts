import { config } from 'dotenv'
import User from '@/models/user.model'
import { Types } from 'mongoose'
config()

export class UserController {
  constructor() { }
  public static async getSocketIdAdmin(): Promise<string | null> {
    try {
      const admin = await User.findOne({ userId: process.env.ADMIN_ID })
      if (!admin) throw new Error('Socket Id Admin not found.')
      return admin.socketId
    } catch (error: any) {
      console.error(error)
      return null
    }
  }

  public static async getSocketIdUser(userId: string): Promise<string | null> {
    try {
      const user = await User.findOne({ userId })
      if (!user) throw new Error('Socket Id User not found.')
      return user.socketId
    } catch (error: any) {
      console.error(error)
      return null
    }
  }

  public static async getObjectIdAdmin(): Promise<Types.ObjectId | null> {
    try {
      const admin = await User.findOne({ userId: process.env.ADMIN_ID })
      if (!admin) throw new Error('Id Admin not found.')
      return admin._id
    } catch (error: any) {
      console.error(error)
      return null
    }
  }

  public static async updateSocketId(userId: string, socketId: string): Promise<void> {
    try {
      await User.findOneAndUpdate({ userId }, { $set: { socketId: socketId } }, { new: true })
    } catch (error: any) {
      console.error(error)
    }
  }

  public static async checkExistedAdmin() {
    try {
      const admin = await User.findOne({ userId: process.env.ADMIN_ID })
      if (!admin) return null
      return admin
    } catch (error: any) {
      console.error(error)
      return null
    }
  }

  public static async checkExistedUser(userId: string) {
    try {
      const user = await User.findOne({ userId })
      if (!user) return null
      return user
    } catch (error: any) {
      console.error(error)
      return null
    }
  }

  public static async createUser(userId: string, email: string, displayName: string, photoURL: string) {
    try {
      const newUser = new User({ userId, email, displayName, photoURL })
      const savedUser = await newUser.save()
      return savedUser
    } catch (error: any) {
      console.error(error)
      return null
    }
  }
}