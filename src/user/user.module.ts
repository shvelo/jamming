import { Inject, Service } from "typedi";
import { UserRepository } from "./user.repository";

@Service()
export class UserModule {
  @Inject()
  userRepository!: UserRepository
}
