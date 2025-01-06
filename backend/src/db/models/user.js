import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, unique: true },
    name: String,
    surname: String,
    gender: String,
    age: Number,
    userType: { type: String, default: 'reader' },
  },
  { timestamps: true },
)

export const User = mongoose.model('user', userSchema)
