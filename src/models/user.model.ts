import mongoose, { Schema } from 'mongoose'
import { Types } from 'mongoose'

export interface IUser {
  _id: Types.ObjectId
  displayName: string
  email: string
  photoURL: string
  userId: string
}

const userSchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  socketId: {
    type: String,
    default: null
  },
  displayName: {
    type: String,
    required: true
  },
  photoURL: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

const User =  mongoose.model('User', userSchema)

export default User