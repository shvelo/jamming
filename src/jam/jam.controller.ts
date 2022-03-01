import { Router } from "../common/api/router"
import { Inject, Service } from "typedi"
import { JamService } from "./jam.service"
import { asyncController } from "../common/api/helpers"
import { auth } from "../auth/middleware"
import { NotFoundError } from "../common/errors"
import { JamStatus } from "./models"
import { User } from "../user/models"

@Service()
export class JamController {
  @Inject()
  jamService!: JamService

  getJam = asyncController(async (req, res) => {
    const jam = await this.jamService.getJam(parseInt(req.params.jamId))
    if (!jam) {
      throw new NotFoundError('Jam not found!')
    }
    res.json(jam)
  })

  getJams = asyncController(async (req, res) => {
    const status = req.query.status as JamStatus
    const jams = await this.jamService.getJams(status)
    res.json(jams)
  })

  createJam = asyncController(async (req, res) => {
    const user = res.locals.user as User
    const jam = await this.jamService.createJam(req.body, user)
    res.status(201).json(jam)
  })

  startJam = asyncController(async (req, res) => {
    const user = res.locals.user as User
    const jam = await this.jamService.startJam(parseInt(req.params.jamId), user)
    res.json(jam)
  })

  joinJam = asyncController(async (req, res) => {
    const user = res.locals.user as User
    const result = await this.jamService.joinJam(parseInt(req.params.jamId), user)
    res.json(result)
  })

  constructor(router: Router) {
    router.get('/jam', this.getJams)
    router.get('/jam/:jamId', this.getJam)
    router.post('/jam', auth, this.createJam)
    router.post('/jam/:jamId/join', auth, this.joinJam)
    router.post('/jam/:jamId/start', auth, this.startJam)
  }
}
