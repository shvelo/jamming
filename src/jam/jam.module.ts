import { Inject, Service } from "typedi"
import { AuthModule } from "../auth/auth.module";
import { UserModule } from "../user/user.module"
import { JamController } from "./jam.controller"
import { JamRepository } from "./jam.repository"
import { JamService } from "./jam.service"

@Service()
export class JamModule {
  @Inject()
  userModule!: UserModule
  @Inject()
  authModule!: AuthModule

  @Inject()
  jamRepository!: JamRepository

  @Inject()
  jamController!: JamController

  @Inject()
  jamService!: JamService
}
