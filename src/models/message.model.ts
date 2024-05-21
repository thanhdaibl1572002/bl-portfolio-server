import mongoose, { Schema } from 'mongoose'

const messageSchema = new Schema({
  conversationId: {
    type: Schema.Types.ObjectId,
    ref: 'Conversation',
    required: true,
  },
  senderId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  receiverId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
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
  emotion: {
    type: String,
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
})

const Message = mongoose.model('Message', messageSchema)

export default Message