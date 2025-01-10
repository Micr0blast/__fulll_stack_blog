import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { UserAuth } from '../db/models/userauth.js'

export async function createUserAuth({ username, password }) {
  const hashedPassword = await bcrypt.hash(password, 10)
  const newUserAuth = new UserAuth({ username, password: hashedPassword })
  return await newUserAuth.save()
}

export async function loginUser({ username, password }) {
  const user = await UserAuth.findOne({ username })
  if (!user) {
    throw new Error('invalid username!')
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password)
  if (!isPasswordCorrect) {
    throw new Error('incorrect password!')
  }

  const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  })

  return token
}

/** TODO change signup to email based sign in and pull apart login and authorisation and user profile info fetching */
export async function getUserInfoById(userId) {
  try {
    const user = await UserAuth.findById(userId)
    if (!user) return { username: userId }
    return { username: user.username }
  } catch (err) {
    return { username: userId }
  }
}
