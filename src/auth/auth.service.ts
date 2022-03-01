import { verify } from 'jsonwebtoken'
import { Inject, Service } from 'typedi'
import { JWTPayload } from './interfaces'
import { UserRepository } from '../user/user.repository'
import { UnauthorizedError } from '../common/errors'

@Service()
export class AuthService {
  @Inject()
  userRepository!: UserRepository

  private secret = process.env.JWT_SECRET
  constructor() { }

  verifyJwt(jwt: string) {
    if (!this.secret) throw new Error('Missing JWT secret!')
    return verify(jwt, this.secret)
  }

  async getUserFromJwt(jwt: string) {
    const payload = this.verifyJwt(jwt) as JWTPayload
    const user = await this.userRepository.findById(payload.userId)
    if (!user)
      throw new UnauthorizedError()
    return user
  }
}
