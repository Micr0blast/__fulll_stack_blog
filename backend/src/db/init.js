import mongoose from 'mongoose'

export function initDatabase() {
  const DATABASE_URL = process.env.DATABASE_URL
  mongoose.connection.on('open', () => {
    console.info('Succesfully connected to database on: ', DATABASE_URL)
  })
  const connection = mongoose.connect(DATABASE_URL)
  return connection
}
