import { verify, sign } from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'
import { Inject, Service } from 'typedi'
import { JWTPayload } from './interfaces'
import { UserRepository } from '../user/user.repository'
import { BadRequestError, UnauthorizedError } from '../common/errors'
import { User } from '../user/models'

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

  signJwt(payload: JWTPayload) {
    if (!this.secret) throw new Error('Missing JWT secret!')
    return sign(payload, this.secret)
  }

  generateJwt(user: User) {
    return this.signJwt({ userId: user.id })
  }

  async getUserFromJwt(jwt: string) {
    const payload = this.verifyJwt(jwt) as JWTPayload
    const user = await this.userRepository.findById(payload.userId)
    if (!user)
      throw new UnauthorizedError()
    return user
  }

  async login(username: string, password: string) {
    const user = await this.authenticate(username, password)
    const jwt = this.generateJwt(user)
    return { user, jwt }
  }

  async authenticate(username: string, password: string) {
    const user = await this.userRepository.findByUsername(username, true)
    if (!user) {
      throw new BadRequestError('Invalid username or password')
    }
    const passwordVerified = await this.verifyPassword(user, password)
    if (!passwordVerified) {
      throw new BadRequestError('Invalid username or password')
    }
    return user
  }

  private async updatePassword(user: User, newPassword: string) {
    const hash = await bcryptjs.hash(newPassword, 8)
    user.password = hash
  }

  private async verifyPassword(user: User, hash: string) {
    return bcryptjs.compare(user.password, hash)
  }
}
