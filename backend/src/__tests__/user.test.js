import mongoose from 'mongoose'
import { beforeEach, describe, test, expect } from '@jest/globals'

import {
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  listAllUsers,
} from '../services/users.js'

import { User } from '../db/models/user.js'

describe('Creating user', () => {
  test('should add user to db', async () => {
    const user = await createUser({
      username: 'stpl',
      email: 'test_mail@testing.com',
      name: 'Stefan',
      surname: 'Plt',
      gender: 'male',
      age: 25,
    })
    const users = await listAllUsers()
    expect(user.toObject()).toEqual(users[0].toObject())
  })
  test('should fail if user with same username already exists', async () => {
    await createUser({
      username: 'stplo',
      email: 'test_mail3@testing.com',
      name: 'Stefan',
      surname: 'Plt',
      gender: 'male',
      age: 25,
    })

    const newUser = createUser({
      username: 'stplo',
      email: 'test_mail4@testing.com',
      name: 'Stefan',
      surname: 'Plt',
      gender: 'male',
      age: 25,
    })
    await expect(newUser).rejects.toThrow(
      'E11000 duplicate key error collection: test.users index: username_1 dup key: { username: "stplo" }',
    )
  })
  test('should fail if user with same email already exists', async () => {
    await createUser({
      username: 'stean',
      email: 'test_mail2@testing.com',
      name: 'Stefan',
      surname: 'Plt',
      gender: 'male',
      age: 25,
    })

    const newUser = createUser({
      username: 'stplo',
      email: 'test_mail2@testing.com',
      name: 'Stefan',
      surname: 'Plt',
      gender: 'male',
      age: 25,
    })
    await expect(newUser).rejects.toThrow(
      'E11000 duplicate key error collection: test.users index: email_1 dup key: { email: "test_mail2@testing.com" }',
    )
  })
  test('should add user with correct types to db', async () => {
    const user = await createUser({
      username: 'stpltwo',
      email: 'test_mailthree@testing.com',
      name: 'Stefan',
      surname: 'Plt',
      gender: 'male',
      age: 25,
    })
    expect(user._id).toBeInstanceOf(mongoose.Types.ObjectId)
    expect(user).toBeInstanceOf(User)
    expect(user.createdAt).toBeInstanceOf(Date)
    expect(user.updatedAt).toBeInstanceOf(Date)
  })
})

const sampleUsers = [
  {
    username: 'stpltest',
    email: 'test_mailstpl@testing.com',
    name: 'Stefan',
    surname: 'Plt',
    gender: 'male',
    age: 25,
  },
  {
    username: 'sera',
    email: 'test_sera@testing.com',
    name: 'Seran',
    surname: 'Plts',
    gender: 'female',
    age: 33,
  },
  {
    username: 'dorn',
    email: 'test_prapn@testing.com',
    name: 'Stefan',
    surname: 'Prapn',
    gender: 'male',
    age: 33,
  },
]

let createdUsers = []

beforeEach(async () => {
  await User.deleteMany({}) // deleta all users in DB
  createdUsers = []
  for (const user of sampleUsers) {
    const newUser = new User(user)
    createdUsers.push(await newUser.save())
  }
})

describe('Updating User', () => {
  test('should update user property', async () => {
    const userId = createdUsers[0]._id
    await updateUser(userId, { name: 'Soren' })
    const updatedUser = await getUserById(userId)
    expect(updatedUser.name).toEqual('Soren')
  })
  test('should leave not specified properties unchanged', async () => {
    const userId = createdUsers[0]._id
    const update = { name: 'Soren' }
    await updateUser(userId, update)
    const updatedUser = await getUserById(userId)
    expect(updatedUser.email).toEqual('test_mailstpl@testing.com')
    expect(updatedUser.surname).toEqual('Plt')
    expect(updatedUser.gender).toEqual('male')
    expect(updatedUser.age).toEqual(25)
  })
  test('should fail if user not in db', async () => {
    const userId = '000000000000000000000000'
    const update = { name: 'Soren' }
    await updateUser(userId, update)
    const updatedUser = await getUserById(userId)
    expect(updatedUser).toEqual(null)
  })
  test('should update timestamps', async () => {
    const userId = createdUsers[0]._id
    const update = { name: 'Soren' }
    await updateUser(userId, update)
    const updatedUser = await getUserById(userId)
    expect(updatedUser.updatedAt.getTime()).toBeGreaterThan(
      updatedUser.createdAt.getTime(),
    )
  })
})

describe('Deleting User', () => {
  test('should remove user from DB', async () => {
    const userId = createdUsers[0]._id
    const deletedUser = await deleteUser(userId)
    expect(deletedUser.deletedCount).toEqual(1)
    expect(await getUserById(userId)).toEqual(null)
  })
  test('should fail if user not in db', async () => {
    const userId = '000000000000000000000000'
    const deletedUser = await deleteUser(userId)
    expect(deletedUser.deletedCount).toEqual(0)
  })
})
