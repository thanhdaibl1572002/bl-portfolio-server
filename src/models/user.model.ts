import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
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