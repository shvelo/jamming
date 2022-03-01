import { Router } from "../common/api/router"
import { Inject, Service } from "typedi"
import { asyncController } from "../common/api/helpers"
import { AuthService } from "./auth.service"
import { auth } from "./middleware"

@Service()
export class AuthController {
  @Inject()
  authService!: AuthService

  login = asyncController(async (req, res) => {
    const result = await this.authService.login(req.body.username, req.body.password)
    res.json(result)
  })

  me = asyncController(async (req, res) => {
    res.json(res.locals.user)
  })

  constructor(router: Router) {
    router.post('/auth/login', this.login)
    router.get('/auth/me', auth, this.me)
  }
}
