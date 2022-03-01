import { Inject, Service } from "typedi";
import { BadRequestError, NotFoundError } from "../common/errors";
import { User } from "./models";
import { UserRepository } from "./user.repository";

@Service()
export class UserService {
  @Inject()
  userRepository!: UserRepository

  async createUser(params: Partial<User>) {
    if (!params.username) {
      throw new BadRequestError('Missing required field username')
    }
    if (!params.fullName) {
      throw new BadRequestError('Missing required field fullName')
    }
    if (!params.role) {
      throw new BadRequestError('Missing required field role')
    }
    const existing = await this.userRepository.findByUsername(params.username)
    if (existing) {
      throw new BadRequestError('Username already taken!')
    }

    const user = await this.userRepository.create({
      username: params.username,
      fullName: params.fullName,
      role: params.role,
    })
    return user
  }

  async updateUser(userId: number, params: Partial<User>) {
    const user = await this.userRepository.findById(userId)
    if (!user) {
      throw new NotFoundError('User not found!')
    }

    if (params.role)
      user.role = params.role
    if (params.fullName)
      user.fullName = params.fullName

    return user.save()
  }
}
