import mongoose, { Schema } from 'mongoose'

const UserAuthSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

export const UserAuth = mongoose.model('userauth', UserAuthSchema)
