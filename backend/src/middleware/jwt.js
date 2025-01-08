import { expressjwt } from 'express-jwt'

export const requireAuth = expressjwt({
  secret: () => process.env.JWT_SECRET, // using function as dotenv isn't loaded yet
  algorithms: ['HS256'],
})
