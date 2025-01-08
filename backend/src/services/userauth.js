import bcrypt from 'bcrypt'
import { UserAuth } from '../db/models/userauth.js'

export async function createUserAuth({ username, password }) {
  const hashedPassword = await bcrypt.hash(password, 10)
  const newUserAuth = new UserAuth({ username, password: hashedPassword })
  return await newUserAuth.save()
}
