import { Inject, Service } from "typedi";
import { AuthService } from "./auth.service";

@Service()
export class AuthModule {
  @Inject()
  authService!: AuthService
}
