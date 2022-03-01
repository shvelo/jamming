import { Inject, Service } from "typedi";
import { UserModule } from "../user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Service()
export class AuthModule {
  @Inject()
  userModule!: UserModule
  
  @Inject()
  authService!: AuthService

  @Inject()
  authController!: AuthController
}
