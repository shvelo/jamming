import { Inject, Service } from "typedi";
import { UserModule } from "../user/user.module";
import { JamController } from "./jam.controller";
import { JamRepository } from "./jam.repository";
import { JamService } from "./jam.service";

@Service()
export class JamModule {
  // Depends on UserModule
  @Inject()
  userModule!: UserModule

  @Inject()
  jamRepository!: JamRepository

  @Inject()
  jamController!: JamController

  @Inject()
  jamService!: JamService
}
