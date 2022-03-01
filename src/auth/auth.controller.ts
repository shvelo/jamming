import { Router } from "../common/api/router"
import { Inject, Service } from "typedi"
import { asyncController } from "../common/api/helpers"
import { AuthService } from "./auth.service"
import { auth } from "./middleware"
import { User } from "../user/models"

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

  signup = asyncController(async (req, res) => {
    const result = await this.authService.signup(req.body)
    res.status(201).json(result)
  })

  updateProfile = asyncController(async (req, res) => {
    const user = res.locals.user as User
    const result = await this.authService.updateProfile(user, req.body)
    res.json(result)
  })

  constructor(router: Router) {
    router.post('/auth/login', this.login)
    router.get('/auth/me', auth, this.me)
    router.post('/user', this.signup)
    router.patch('/user/me', auth, this.updateProfile)
  }
}
