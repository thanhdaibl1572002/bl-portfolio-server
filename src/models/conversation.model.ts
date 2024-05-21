import mongoose, { Schema } from 'mongoose'

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