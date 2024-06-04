import mongoose, { Schema, Types } from 'mongoose'
import { IUser } from '@/models/user.model'

export interface IConversation {
  _id: Types.ObjectId
  participants: IUser[]
  createdAt: Date
  updatedAt: Date
}

const conversationSchema = new Schema({
  participants: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

const Conversation = mongoose.model('Conversation', conversationSchema)

export default Conversation