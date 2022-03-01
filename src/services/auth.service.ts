import { verify } from 'jsonwebtoken'
import { UserJWTPayload } from '../common/interfaces'
import { User } from '../models'

class AuthService {
  private secret = process.env.JWT_SECRET
  constructor() { }

  verifyJwt(jwt: string) {
    if(!this.secret) throw new Error('Missing JWT secret!')
    return verify(jwt, this.secret)
  }

  getUserFromJwt(jwt: string) {
    const payload = this.verifyJwt(jwt) as UserJWTPayload
    return User.fromJWTPayload(payload)
  }
}

export default new AuthService()
