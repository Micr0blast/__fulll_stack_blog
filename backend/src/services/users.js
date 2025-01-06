import { User } from '../db/models/user.js'

export async function createUser({
  username,
  email,
  name,
  surname,
  gender,
  age,
  isAuthor,
}) {
  const newUser = new User({
    username,
    email,
    name,
    surname,
    gender,
    age,
    isAuthor,
  })
  return await newUser.save()
}

async function listUsers(
  query = {},
  { sortBy = 'createdAt', sortOrder = 'descending' } = {},
) {
  const users = await User.find(query).sort({ [sortBy]: sortOrder })
  return users
}

export async function listAllUsers(options) {
  return await listUsers({}, options)
}

export async function getUserById(userId) {
  return await User.findById(userId)
}

export async function getAllAuthors(options) {
  return await listUsers({ isAuthor: true }, options)
}

export async function getAllReaders(options) {
  return await listUsers({ isAuthor: false }, options)
}

export async function deleteUser(userId) {
  return await User.deleteOne({ _id: userId })
}

export async function updateUser(
  userId,
  { username, email, name, surname, gender, age, isAuthor },
) {
  return await User.updateOne(
    { _id: userId },
    {
      $set: { username, email, name, surname, gender, age, isAuthor },
    },
    { new: true },
  )
}
