import mongoose, { Schema } from 'mongoose'

export interface IMessage {
  _id: string
  type: 'text' | 'image'
  content: string
  emotion: string
  createdAt: string
  updatedAt: string
  replyTo: Object | null
  recall: boolean
  unread: boolean
}

const messageSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  from: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['text', 'image'],
    required: true,
  },
  content: {
    type: Object,
    required: true,
  },
  emotions: {
    admin: String,
    user: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  replyTo: {
    type: Object,
  },
  recall: {
    type: Boolean,
    default: false,
  },
  unread: {
    type: Boolean,
    default: true,
  }
})

const Message = mongoose.model('Message', messageSchema)

export default Message