import { Inject, Service } from "typedi";
import { UserRepository } from "./user.repository"
import { UserService } from "./user.service"

@Service()
export class UserModule {
  @Inject()
  userRepository!: UserRepository

  @Inject()
  userService!: UserService
}
